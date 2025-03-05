import { provideIcons } from '@ng-icons/core';
import {
  lucideCompass,
  lucideHeart,
  lucideHouse,
  lucideLibrary,
  lucideLogIn,
  lucideLogOut,
  lucideMoon,
  lucideMusic2,
  lucidePause,
  lucidePlay,
  lucidePlus,
  lucideSearch,
  lucideSkipBack,
  lucideSkipForward,
  lucideVolume2,
  lucideVolumeOff,
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
  lucidePlay,
  lucidePause,
  lucideSkipBack,
  lucideSkipForward,
  lucideVolume2,
  lucideVolumeOff,
  lucideHeart,
};

export const provideAppIcons = provideIcons(icons);
