import { SpotifyArtist } from './spotify-artist';

export interface SpotifyAlbumImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyAlbum {
  album_type: string;
  artists: SpotifyArtist[];
  id: string;
  images: SpotifyAlbumImage[];
  name: string;
}
