import { Injectable } from '@angular/core';

export type Toast = {
  header?: string;
  body: string;
  delay?: number;
  className?: string;
};

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  toasts: Toast[] = [];

  show(header: string, body: string) {
    this.toasts.push({ header, body });
  }

  showSuccess(body: string) {
    this.toasts.push({
      body,
      delay: 1500,
      className: 'toast bg-success text-light',
    });
  }

  showError(body: string) {
    this.toasts.push({
      body,
      delay: 2500,
      className: 'toast bg-danger text-light',
    });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
