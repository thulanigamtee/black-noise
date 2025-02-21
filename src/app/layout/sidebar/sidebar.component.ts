import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-sidebar',
  imports: [HlmIconDirective, NgIcon, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  routes: { name: string; icon: string; path: string }[] = [
    { name: 'home', icon: 'lucideHouse', path: '' },
    { name: 'explore', icon: 'lucideCompass', path: 'explore' },
    { name: 'library', icon: 'lucideLibrary', path: 'library' },
  ];
}
