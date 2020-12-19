import { Component } from '@angular/core';

import { ToastsService } from '../../services/toasts.service';

@Component({
  selector: 'ls-app-toasts',
  templateUrl: './app-toasts.component.html',
  styleUrls: ['./app-toasts.component.scss']
})
export class AppToastsComponent {
  constructor(public toastsService: ToastsService) {}
}
