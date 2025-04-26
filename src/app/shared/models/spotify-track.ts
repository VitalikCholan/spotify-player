import { SpotifyAlbum } from './spotify-album';
import { SpotifyArtist } from './spotify-artist';

export interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  id: string;
  name: string;
  preview_url: string | null;
  images: { url: string; width: number; height: number }[];
}
