import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddSongComponent } from './pages/add-song/add-song.component';

export const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: AddSongComponent, path: 'addSong' },
];
