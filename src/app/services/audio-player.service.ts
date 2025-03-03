import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../shared/models/song.model';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private audio = new Audio();
  private currentSongSubject = new BehaviorSubject<Song | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private durationSubject = new BehaviorSubject<number>(0);
  private volumeSubject = new BehaviorSubject<number>(1);

  currentSong$ = this.currentSongSubject.asObservable();
  isPlaying$ = this.isPlayingSubject.asObservable();
  currentTime$ = this.currentTimeSubject.asObservable();
  duration$ = this.durationSubject.asObservable();
  volume$ = this.volumeSubject.asObservable();

  constructor() {
    this.audio.addEventListener('timeupdate', () =>
      this.currentTimeSubject.next(this.audio.currentTime)
    );

    this.audio.addEventListener('loadedmetadata', () =>
      this.durationSubject.next(this.audio.duration)
    );
  }

  playSong(song: Song) {
    if (this.currentSongSubject.value?.audio !== song.audio) {
      this.audio.src = song.audio;
      this.currentSongSubject.next(song);
    }
    this.audio.play();
    this.isPlayingSubject.next(true);
  }

  pause() {
    this.audio.pause();
    this.isPlayingSubject.next(false);
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
    this.volumeSubject.next(volume);
  }
}
