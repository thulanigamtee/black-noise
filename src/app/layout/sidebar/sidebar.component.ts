import { Component, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';
import {
  BrnDialogComponent,
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { AddSongFormComponent } from '../../shared/components/add-song-form/add-song-form.component';
@Component({
  selector: 'app-sidebar',
  imports: [
    HlmIconDirective,
    NgIcon,
    RouterLink,
    RouterLinkActive,
    HlmButtonDirective,
    HlmTooltipTriggerDirective,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmButtonDirective,
    AddSongFormComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  routes: { name: string; icon: string; path: string }[] = [
    { name: 'home', icon: 'lucideHouse', path: '' },
    { name: 'explore', icon: 'lucideCompass', path: 'explore' },
    { name: 'library', icon: 'lucideLibrary', path: 'library' },
  ];

  public viewchildDialogRef = viewChild(BrnDialogComponent);

  closeDialog() {
    this.viewchildDialogRef()?.close({});
  }
}
