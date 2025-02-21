import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { LibraryComponent } from './pages/library/library.component';

export const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: ExploreComponent, path: 'explore' },
  { component: LibraryComponent, path: 'library' },
];
