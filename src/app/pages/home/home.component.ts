import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { SongsListComponent } from '../../shared/components/songs-list/songs-list.component';
import { AudioPlayerService } from '../../services/audio-player.service';
import { AsyncPipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [SongsListComponent, NgStyle, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private themeService = inject(ThemeService);
  private audioPlayerService = inject(AudioPlayerService);

  currentSong$ = this.audioPlayerService.currentSong$;

  changeTheme(theme: 'light' | 'dark' | 'system') {
    this.themeService.Theme = theme;
  }
}
