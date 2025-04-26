import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { Observable, switchMap } from 'rxjs';
import { SpotifyTrack } from '../../shared/models/spotify-track';

@Injectable({
  providedIn: 'root',
})
export class SpotifyApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getObject(
    type: 'track' | 'album' | 'playlist',
    id: string
  ): Observable<SpotifyTrack> {
    return this.auth.getToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<SpotifyTrack>(
          `https://api.spotify.com/v1/${type}s/${id}`,
          { headers }
        );
      })
    );
  }
}
