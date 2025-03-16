export interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  audio: string;
  liked?: boolean;
}
