import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapIconsModule, trashFill } from 'ngx-bootstrap-icons';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { AppToastsComponent } from './components/app-toasts/app-toasts.component';
import { ToastsService } from './services/toasts.service';

const icons = {
  trashFill,
};

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(icons),
  ],
  exports: [
    NgbModule,
    NgxBootstrapIconsModule,
    SpinnerComponent,
    SelectComponent,
    AppToastsComponent,
  ],
  declarations: [
    SpinnerComponent,
    SelectComponent,
    AppToastsComponent,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [ToastsService],
    }
  }
}
