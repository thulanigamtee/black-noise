import { FormControl } from '@angular/forms';

export type Song = {
  title: FormControl<string>;
  artist: FormControl<string>;
  thumbnail: FormControl<File | null>;
  audio: FormControl<File | null>;
};
