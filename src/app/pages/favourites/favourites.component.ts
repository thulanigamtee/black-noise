import { Component, inject } from '@angular/core';
import { AppwriteService } from '../../services/appwrite.service';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { map } from 'rxjs';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { AudioPlayerService } from '../../services/audio-player.service';
import { Song } from '../../shared/models/song.model';

@Component({
  selector: 'app-favourites',
  imports: [
    AsyncPipe,
    NgIcon,
    HlmIconDirective,
    HlmButtonDirective,
    NgClass,
    NgStyle,
  ],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
  appwriteService = inject(AppwriteService);

  songs$ = this.appwriteService.fetchSongs();
  songs: Song[] = [];

  ngOnInit() {
    this.songs$.subscribe(
      (songs) => (this.songs = songs.filter((song) => song.liked))
    );
  }
}
