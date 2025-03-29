import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../shared/models/song.model';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private audio = new Audio();
  private playlist: Song[] = [];
  private currentSongIndex = 0;
  private lastPlaybackTime = 0;

  private currentSongSubject = new BehaviorSubject<Song | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private durationSubject = new BehaviorSubject<number>(0);

  currentSong$ = this.currentSongSubject.asObservable();
  isPlaying$ = this.isPlayingSubject.asObservable();
  currentTime$ = this.currentTimeSubject.asObservable();
  duration$ = this.durationSubject.asObservable();

  private currentVolume = 1;
  volume$ = new BehaviorSubject<number>(this.currentVolume);

  constructor() {
    this.audio.addEventListener('timeupdate', () =>
      this.currentTimeSubject.next(this.audio.currentTime)
    );

    this.audio.addEventListener('loadedmetadata', () =>
      this.durationSubject.next(this.audio.duration)
    );

    this.audio.volume = this.currentVolume;
  }

  setPlaylist(songs: Song[]) {
    this.playlist = songs;
  }

  setVolume(event: Event) {
    const volume = (event.target as HTMLInputElement).valueAsNumber;
    this.currentVolume = volume;
    this.audio.volume = volume;
    this.volume$.next(volume);
  }

  toggleMute() {
    if (this.audio.volume > 0) {
      this.currentVolume = this.audio.volume;
      this.audio.volume = 0;
    } else this.audio.volume = this.currentVolume;

    this.volume$.next(this.audio.volume);
  }

  playSong(song: Song) {
    const songIndex = this.playlist.findIndex((s) => s.audio === song.audio);

    if (songIndex !== -1) {
      if (
        this.currentSongIndex !== songIndex ||
        this.audio.src !== song.audio
      ) {
        this.currentSongIndex = songIndex;
        this.audio.src = song.audio;
        this.audio.load();
        this.lastPlaybackTime = 0;
      }

      this.currentSongSubject.next(song);
      this.audio.currentTime = this.lastPlaybackTime;
      this.audio.play();
      this.isPlayingSubject.next(true);
    }
  }

  pause() {
    this.lastPlaybackTime = this.audio.currentTime;
    this.audio.pause();
    this.isPlayingSubject.next(false);
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }

  skipBack() {
    if (this.currentSongIndex > 0) {
      this.playSong(this.playlist[this.currentSongIndex - 1]);
    }
  }

  skipForward() {
    if (this.currentSongIndex < this.playlist.length - 1) {
      this.playSong(this.playlist[this.currentSongIndex + 1]);
    }
  }
}
