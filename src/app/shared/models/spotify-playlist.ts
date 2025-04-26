export interface SpotifyPlaylist {
  name: string;
  images: { url: string; height: number; width: number }[];
  owner: { display_name: string };
  tracks: { total: number };
}
