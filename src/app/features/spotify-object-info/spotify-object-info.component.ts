import { SpotifyTrack } from '../../shared/models/spotify-track';
import { SpotifyAlbum } from '../../shared/models/spotify-album';
import { SpotifyPlaylist } from '../../shared/models/spotify-playlist';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

export type SpotifyData = SpotifyTrack | SpotifyAlbum | SpotifyPlaylist;

@Component({
  selector: 'app-spotify-object-info',
  standalone: true,
  imports: [],
  templateUrl: './spotify-object-info.component.html',
  styleUrl: './spotify-object-info.component.css',
})
export class SpotifyObjectInfoComponent {
  @Input() data: SpotifyData | null = null;

  isTrack(data: SpotifyData): data is SpotifyTrack {
    return (data as SpotifyTrack).album !== undefined;
  }

  isAlbum(data: SpotifyData): data is SpotifyAlbum {
    return (
      (data as SpotifyAlbum).artists !== undefined &&
      (data as SpotifyAlbum).images !== undefined
    );
  }

  isPlaylist(data: SpotifyData): data is SpotifyPlaylist {
    return (
      (data as SpotifyPlaylist).owner !== undefined &&
      (data as SpotifyPlaylist).tracks !== undefined
    );
  }
}
