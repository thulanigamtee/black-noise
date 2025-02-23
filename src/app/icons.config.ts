import { provideIcons } from '@ng-icons/core';
import {
  lucideCompass,
  lucideHouse,
  lucideLibrary,
  lucideLogIn,
  lucideLogOut,
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
  lucideLogIn,
  lucideLogOut,
};

export const provideAppIcons = provideIcons(icons);
