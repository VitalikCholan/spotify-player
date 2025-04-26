import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SpotifyApiService } from '../../spotify-api/spotify-api.service';
import { SpotifyTrack } from '../../../shared/models/spotify-track';
import { SpotifyObjectType } from '../../../shared/models/spotify-object-type';

@Component({
  selector: 'app-url-input',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './url-input.component.html',
  styleUrl: './url-input.component.css',
})
export class UrlInputComponent {
  urlForm: FormGroup;
  spotifyData$: Observable<SpotifyTrack | null> | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private spotifyApi: SpotifyApiService) {
    this.urlForm = this.fb.group({
      spotifyUrl: ['', [Validators.required, this.spotifyUrlValidator]],
    });
  }

  // Custom validator for Spotify URLs
  spotifyUrlValidator(control: AbstractControl): ValidationErrors | null {
    const url = control.value;
    const regex =
      /^https:\/\/open\.spotify\.com\/(track|album|playlist)\/[a-zA-Z0-9]+/;
    return regex.test(url) ? null : { invalidSpotifyUrl: true };
  }

  // Extract type and ID from the URL
  extractTypeAndId(url: string): { type: string; id: string } | null {
    const regex =
      /^https:\/\/open\.spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)(\?.*)?$/;
    const match = url.match(regex);
    if (match) {
      return { type: match[1], id: match[2] };
    }
    return null;
  }

  onSubmit() {
    this.error = null;
    if (this.urlForm.valid) {
      const url = this.urlForm.value.spotifyUrl;
      const result = this.extractTypeAndId(url);
      if (result) {
        this.spotifyData$ = this.spotifyApi
          .getObject(result.type as SpotifyObjectType, result.id)
          .pipe(
            catchError((err) => {
              this.error = 'Failed to fetch data from Spotify API.';
              return of(null);
            })
          );
      }
    }
  }
}
