import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    NgbModule,
    SpinnerComponent,
    SelectComponent
  ],
  declarations: [SpinnerComponent, SelectComponent],
})
export class SharedModule {}
