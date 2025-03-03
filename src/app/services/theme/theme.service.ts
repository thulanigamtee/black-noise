import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private themeSubject = new BehaviorSubject<Theme>('dark');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.loadTheme();
    this.listenToSystemChanges();
  }

  set Theme(theme: Theme) {
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
    this.themeSubject.next(theme);
  }

  get Theme(): Theme {
    return this.themeSubject.getValue();
  }

  private applyTheme(theme: Theme) {
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
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    this.applyTheme(savedTheme || 'system');
  }

  private listenToSystemChanges() {
    this.systemMediaQuery.addEventListener('change', (event) => {
      if (this.themeSubject.getValue() === 'system') {
        const newTheme = event.matches ? 'dark' : 'light';
        this.applyTheme(newTheme);
      }
    });
  }
}
