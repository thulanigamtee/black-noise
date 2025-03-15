import { Component, inject } from '@angular/core';
import { AudioPlayerService } from '../../../services/audio-player.service';
import { AppwriteService } from '../../../services/appwrite.service';
import { Song } from '../../models/song.model';
import { AsyncPipe, NgStyle } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIcon } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-songs-list',
  imports: [AsyncPipe, HlmButtonDirective, NgIcon, HlmIconDirective, NgStyle],
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.scss',
})
export class SongsListComponent {
  private audioPlayerService = inject(AudioPlayerService);
  private appwriteService = inject(AppwriteService);

  songs$ = this.appwriteService.fetchSongs();
  currentSong$ = this.audioPlayerService.currentSong$;
  isPlaying$ = this.audioPlayerService.isPlaying$;

  currentSong: Song | null = null;
  isPlaying: boolean = false;

  constructor() {
    this.currentSong$.subscribe((song) => (this.currentSong = song));
    this.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));

    this.songs$.then((songs) => {
      this.audioPlayerService.setPlaylist(songs);
    });
  }

  togglePlay(song: Song) {
    if (song === this.currentSong && this.isPlaying) {
      this.audioPlayerService.pause();
    } else this.audioPlayerService.playSong(song);
  }
}
