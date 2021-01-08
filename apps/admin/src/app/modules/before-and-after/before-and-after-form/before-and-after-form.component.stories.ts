
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { PictureControlComponent } from '../picture-control/picture-control.component';
import { PictureDropzonePreviewComponent } from '../picture-dropzone-preview/picture-dropzone-preview.component';
import { BeforeAndAfterFormComponent } from './before-and-after-form.component';

export default {
  title: 'BeforeAndAfterFormComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      HttpClientTestingModule,
      RouterTestingModule,
      MatAutocompleteModule,
      NgxDropzoneModule,
    ],
    declarations: [
      SpinnerComponent,
      CheckboxComponent,
      PictureControlComponent,
      PictureDropzonePreviewComponent,
    ],
  },
  component: BeforeAndAfterFormComponent,
  props: {
  }
})
