import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { TokenResponse } from '../../../shared/models/token-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private tokenExpirationTime: number | null = null;

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem('spotify_token');
    const storedExpiration = localStorage.getItem('token_expiration');
    if (storedToken && storedExpiration && +storedExpiration > Date.now()) {
      this.tokenSubject.next(storedToken);
      this.tokenExpirationTime = +storedExpiration;
    } else {
      this.clearToken();
    }
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.tokenSubject.value !== null;
  }

  login(): void {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${
      environment.spotifyClientId
    }&response_type=code&redirect_uri=${encodeURIComponent(
      environment.redirectUri
    )}&scope=${encodeURIComponent(
      'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state'
    )}`;
    window.location.href = authUrl;
  }

  handleCallback(code: string): Observable<TokenResponse> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', environment.redirectUri)
      .set('client_id', environment.spotifyClientId)
      .set('client_secret', environment.spotifyClientSecret);

    return this.http
      .post<TokenResponse>('https://accounts.spotify.com/api/token', body)
      .pipe(
        tap((response) => {
          this.setToken(response.access_token, response.expires_in);
          if (response.refresh_token) {
            localStorage.setItem('refresh_token', response.refresh_token);
          }
        })
      );
  }

  refreshToken(): Observable<TokenResponse | null> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return of(null);

    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken)
      .set('client_id', environment.spotifyClientId)
      .set('client_secret', environment.spotifyClientSecret);

    return this.http
      .post<TokenResponse>('https://accounts.spotify.com/api/token', body)
      .pipe(
        tap((response) => {
          this.setToken(response.access_token, response.expires_in);
        })
      );
  }

  logout(): void {
    this.clearToken();
    localStorage.removeItem('refresh_token');
  }

  private setToken(token: string, expiresIn: number): void {
    this.tokenSubject.next(token);
    this.tokenExpirationTime = Date.now() + expiresIn * 1000;
    localStorage.setItem('spotify_token', token);
    localStorage.setItem(
      'token_expiration',
      this.tokenExpirationTime.toString()
    );
  }

  private clearToken(): void {
    this.tokenSubject.next(null);
    this.tokenExpirationTime = null;
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('token_expiration');
  }
}
