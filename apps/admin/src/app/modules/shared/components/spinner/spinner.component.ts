import { Component } from '@angular/core';

@Component({
  selector: 'ls-spinner',
  templateUrl: './spinner.component.html',
  host: {
    'class': 'spinner spinner-border',
    'role': 'status',
  }
})
export class SpinnerComponent {}
