import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private themeService: ThemeService) {}

  changeTheme(theme: 'light' | 'dark' | 'system') {
    this.themeService.setTheme(theme);
  }
}
