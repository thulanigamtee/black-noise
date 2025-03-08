import { Component, inject } from '@angular/core';
import { AudioPlayerService } from '../../../services/audio-player.service';
import { firstValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { TimePipe } from '../../pipes/time.pipe';

@Component({
  selector: 'app-player',
  imports: [AsyncPipe, NgIcon, HlmButtonDirective, HlmIconDirective, TimePipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  private audioPlayerService = inject(AudioPlayerService);

  currentSong$ = this.audioPlayerService.currentSong$;
  isPlaying$ = this.audioPlayerService.isPlaying$;
  currentTime$ = this.audioPlayerService.currentTime$;
  duration$ = this.audioPlayerService.duration$;
  volume$ = this.audioPlayerService.volume$;

  isPlaying: boolean = false;

  constructor() {
    this.isPlaying$.subscribe((value) => (this.isPlaying = value));
  }

  async play() {
    const song = await firstValueFrom(this.currentSong$);
    if (song) this.audioPlayerService.playSong(song);
  }

  pause() {
    this.audioPlayerService.pause();
  }

  seek(event: Event) {
    const time = (event.target as HTMLInputElement).value;
    this.audioPlayerService.seek(Number(time));
  }

  setVolume(event: Event) {
    this.audioPlayerService.setVolume(event);
  }

  toggleMute() {
    this.audioPlayerService.toggleMute();
  }
}
