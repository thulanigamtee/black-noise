import { Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemCheckboxDirective,
  HlmMenuItemCheckComponent,
} from '@spartan-ng/ui-menu-helm';
import { ThemeService } from '../../services/theme.service';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { ClerkService } from '../../services/clerk.service';
import { UserResource } from '@clerk/types';
import {
  HlmAvatarImageDirective,
  HlmAvatarComponent,
} from '@spartan-ng/ui-avatar-helm';
import { HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';

@Component({
  selector: 'app-header',
  imports: [
    HlmIconDirective,
    NgIcon,
    HlmInputDirective,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemCheckComponent,
    HlmMenuGroupComponent,
    HlmMenuItemCheckboxDirective,
    HlmButtonDirective,
    HlmIconDirective,
    LogoComponent,
    HlmAvatarComponent,
    HlmAvatarImageDirective,
    HlmTooltipTriggerDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  clerkService = inject(ClerkService);
  user: UserResource | null = null;

  themeService = inject(ThemeService);
  activeColorScheme = 'system';

  colorSchemes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];

  ngOnInit(): void {
    this.clerkService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  setColorScheme(scheme: 'light' | 'dark' | 'system') {
    this.activeColorScheme = scheme;
    this.themeService.setTheme(scheme);
  }

  signIn() {
    this.clerkService.openSignIn();
  }

  signOut() {
    this.clerkService.signOut();
  }
}
