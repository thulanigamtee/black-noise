import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmErrorDirective,
  HlmFormFieldComponent,
} from '@spartan-ng/ui-formfield-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { Song } from './add-song-model';
import { AppwriteService } from '../../../services/appwrite.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-song-form',
  imports: [
    NgIcon,
    ReactiveFormsModule,
    HlmFormFieldComponent,
    HlmErrorDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    HlmIconDirective,
  ],
  templateUrl: './add-song-form.component.html',
  styleUrl: './add-song-form.component.scss',
})
export class AddSongFormComponent {
  private formBuilder = inject(FormBuilder);
  private appwriteService = inject(AppwriteService);

  form = this.formBuilder.nonNullable.group<Song>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    artist: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    thumbnail: new FormControl<File | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    audio: new FormControl<File | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onFileSelected(event: Event, controlName: 'thumbnail' | 'audio') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ [controlName]: file });
    }
  }

  async submit() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }

    try {
      const title = this.form.get('title')?.value || '';
      const artist = this.form.get('artist')?.value || '';
      const thumbnailFile = this.form.get('thumbnail')?.value as File | null;
      const audioFile = this.form.get('audio')?.value as File | null;

      if (!thumbnailFile || !audioFile) {
        throw new Error('Files are missing!');
      }

      const thumbnailId = await this.appwriteService.uploadFile(
        thumbnailFile,
        environment.appwrite.thumbnailBuckedId
      );
      const audioId = await this.appwriteService.uploadFile(
        audioFile,
        environment.appwrite.audioBucketId
      );

      const songData = {
        title,
        artist,
        thumbnail: thumbnailId,
        audio: audioId,
      };

      const response = await this.appwriteService.saveSong(songData);
      console.log('Song uploaded:', response);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }
}
