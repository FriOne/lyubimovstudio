import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { AppToastsComponent } from './components/app-toasts/app-toasts.component';
import { ToastsService } from './services/toasts.service';
import { PicturesService } from './services/pictures.service';
import { PicturePathPipe } from './picture-path.pipe';
import { ProjectsService } from './services/projects.service';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxDropzoneModule,
  ],
  exports: [
    NgbModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    SpinnerComponent,
    SelectComponent,
    AppToastsComponent,
    PicturePathPipe,
    CheckboxComponent,
  ],
  declarations: [
    SpinnerComponent,
    SelectComponent,
    AppToastsComponent,
    PicturePathPipe,
    CheckboxComponent,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ToastsService,
        PicturesService,
        ProjectsService,
      ],
    }
  }
}
