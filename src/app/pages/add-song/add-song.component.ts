import { Component, inject } from '@angular/core';
import { AddSongFormComponent } from '../../shared/components/add-song-form/add-song-form.component';
import { AudioPlayerService } from '../../services/audio-player.service';
import { AsyncPipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-add-song',
  imports: [AddSongFormComponent, NgStyle, AsyncPipe],
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.scss',
})
export class AddSongComponent {
  audioPlayerService = inject(AudioPlayerService);
  currentSong$ = this.audioPlayerService.currentSong$;
}
