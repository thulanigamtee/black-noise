import { Component, Signal, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastMessage, ToastService } from '../../../services/toast.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: 'toast.component.html',
  styles: [
    `
      .toast-success {
        background-color: #4caf50;
      }
      .toast-error {
        background-color: #f44336;
      }
    `,
  ],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class ToastComponent {
  toastService = inject(ToastService);

  toasts: Signal<ToastMessage[]> = this.toastService.toasts;

  getToastClass(type: string) {
    return {
      'toast-success': type === 'success',
      'toast-error': type === 'error',
    };
  }
}
