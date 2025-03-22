import { Component } from '@angular/core';
import { AddSongFormComponent } from '../../shared/components/add-song-form/add-song-form.component';

@Component({
  selector: 'app-add-song',
  imports: [AddSongFormComponent],
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.scss',
})
export class AddSongComponent {}
