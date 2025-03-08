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
import { ThemeService } from '../../services/theme/theme.service';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { UserResource } from '@clerk/types';
import {
  HlmAvatarImageDirective,
  HlmAvatarComponent,
} from '@spartan-ng/ui-avatar-helm';
import { HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';
import { AppwriteService } from '../../services/appwrite.service';
import { AuthService } from '../../services/auth/auth.service';
import { AsyncPipe } from '@angular/common';

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
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  appwriteService = inject(AppwriteService);

  theme$ = this.themeService.theme$;
  user$ = this.authService.user$;

  user: UserResource | null = null;

  themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];

  constructor() {
    this.user$.subscribe((user) => (this.user = user));
  }

  setTheme(scheme: 'light' | 'dark' | 'system') {
    this.themeService.Theme = scheme;
  }

  async signIn() {
    try {
      this.authService.signIn();
      this.appwriteService.saveUserData();
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async signOut() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }
}
