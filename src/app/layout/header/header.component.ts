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
import { ThemeService } from '../../core/theme.service';
import { LogoComponent } from '../../shared/components/logo/logo.component';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  colorScheme = 'system';

  setColorScheme(scheme: 'light' | 'dark' | 'system') {
    this.colorScheme = scheme;
    this.themeService.setTheme(scheme);
  }
}
