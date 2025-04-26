import { Component, Input } from '@angular/core';
import { SpotifyTrack } from '../../shared/models/spotify-track';

@Component({
  selector: 'app-spotify-object-info',
  standalone: true,
  imports: [],
  templateUrl: './spotify-object-info.component.html',
  styleUrl: './spotify-object-info.component.css',
})
export class SpotifyObjectInfoComponent {
  @Input() data: SpotifyTrack | null = null;
}
