import { Component, inject } from '@angular/core';
import { AudioPlayerService } from '../../../services/audio-player.service';
import { AppwriteService } from '../../../services/appwrite.service';
import { Song } from '../../models/song.model';
import { NgClass, NgStyle } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIcon } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-songs-list',
  imports: [HlmButtonDirective, NgIcon, HlmIconDirective, NgStyle, NgClass],
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

  songs: Song[] = [];
  constructor() {
    this.currentSong$.subscribe((song) => (this.currentSong = song));
    this.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));
    this.songs$.subscribe((songs) =>
      this.audioPlayerService.setPlaylist(songs)
    );
    this.songs$.subscribe((songs) => (this.songs = songs));
  }

  togglePlay(song: Song) {
    if (song === this.currentSong && this.isPlaying) {
      this.audioPlayerService.pause();
    } else this.audioPlayerService.playSong(song);
  }

  toggleLike(song: Song) {
    this.appwriteService.toggleLike(song).then(() => {
      song.liked = !song.liked;
    });
  }
}
