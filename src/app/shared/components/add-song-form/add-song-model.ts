import { FormControl } from '@angular/forms';

export type Song = {
  title: FormControl<string>;
  author: FormControl<string>;
  thumbnail: FormControl<File | null>;
  audio: FormControl<File | null>;
};
