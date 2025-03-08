import { Component, inject } from '@angular/core';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from './shared/components/player/player.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  imports: [
    SidebarComponent,
    HeaderComponent,
    RouterOutlet,
    PlayerComponent,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  toastService = inject(ToastService);

  showSuccess() {
    this.toastService.showToast('Operation successful!', 'success');
  }

  showError() {
    this.toastService.showToast('Something went wrong!', 'error');
  }
}
