import { Component } from '@angular/core';

@Component({
  selector: 'ls-spinner',
  templateUrl: './spinner.component.html',
  host: {
    'class': 'spinner spinner-border text-primary',
    'role': 'status',
  }
})
export class SpinnerComponent {}
