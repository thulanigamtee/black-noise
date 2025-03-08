import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private nextId = 0;
  toasts = signal<ToastMessage[]>([]);

  showToast(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
    duration = 3000
  ) {
    const id = this.nextId++;
    this.toasts.update((toasts) => [...toasts, { id, message, type }]);

    setTimeout(() => this.removeToast(id), duration);
  }

  removeToast(id: number) {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }
}
