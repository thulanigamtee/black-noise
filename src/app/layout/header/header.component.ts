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
import { AppwriteService } from '../../services/appwrite.service';

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
  appwriteService = inject(AppwriteService);
  user: UserResource | null = null;

  themeService = inject(ThemeService);
  activeColorScheme: string | null = null;

  colorSchemes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];

  ngOnInit(): void {
    this.clerkService.user$.subscribe((user) => {
      this.user = user;
    });
    this.themeService.theme$.subscribe((theme) => {
      this.activeColorScheme = theme;
    });
  }

  setColorScheme(scheme: 'light' | 'dark' | 'system') {
    this.themeService.setTheme(scheme);
  }

  async signIn() {
    try {
      this.clerkService.openSignIn();
      this.appwriteService.saveUserData();
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async signOut() {
    try {
      await this.clerkService.signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }
}
