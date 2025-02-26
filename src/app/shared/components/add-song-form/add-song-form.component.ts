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
import { Song } from './add-song-model';

@Component({
  selector: 'app-add-song-form',
  imports: [
    NgIcon,
    ReactiveFormsModule,
    HlmFormFieldComponent,
    HlmErrorDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmIconDirective,
  ],
  templateUrl: './add-song-form.component.html',
  styleUrl: './add-song-form.component.scss',
})
export class AddSongFormComponent {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group<Song>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    thumbnail: new FormControl(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    audio: new FormControl(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
