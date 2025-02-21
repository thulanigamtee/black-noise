import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    this.loadTheme();
    this.listenToSystemChanges();
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: 'light' | 'dark' | 'system') {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as
      | 'light'
      | 'dark'
      | 'system'
      | null;
    this.applyTheme(savedTheme || 'system');
  }

  private listenToSystemChanges() {
    // Listen for changes in the system's color scheme
    this.systemMediaQuery.addEventListener('change', (event) => {
      const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
      if (savedTheme === 'system') {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(event.matches ? 'dark' : 'light');
      }
    });
  }
}
