import { provideIcons } from '@ng-icons/core';
import {
  lucideCompass,
  lucideHouse,
  lucideLibrary,
  lucideMoon,
  lucideMusic2,
  lucidePlus,
  lucideSearch,
} from '@ng-icons/lucide';

export const icons = {
  lucideHouse,
  lucideMusic2,
  lucideSearch,
  lucidePlus,
  lucideCompass,
  lucideLibrary,
  lucideMoon,
};

export const provideAppIcons = provideIcons(icons);
