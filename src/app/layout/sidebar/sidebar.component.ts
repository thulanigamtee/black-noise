import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { AuthService } from '../../services/auth/auth.service';
import { UserResource } from '@clerk/types';
@Component({
  selector: 'app-sidebar',
  imports: [HlmIconDirective, NgIcon, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  authService = inject(AuthService);
  user: UserResource | null = null;

  constructor() {
    this.authService.user$.subscribe((user) => (this.user = user));
  }

  routes: { name: string; icon: string; path: string }[] = [
    { name: 'home', icon: 'lucideHouse', path: '' },
    { name: 'add song', icon: 'lucidePlus', path: 'addSong' },
  ];
}
