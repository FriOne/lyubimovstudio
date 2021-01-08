
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { ProjectPictureDropzonePreviewComponent } from '../project-picture-dropzone-preview/project-picture-dropzone-preview.component';
import { ProjectPicturesComponent } from '../project-pictures/project-pictures.component';
import { ProjectFormComponent } from './project-form.component';

export default {
  title: 'ProjectFormComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      HttpClientTestingModule,
      RouterTestingModule,
      NgxDropzoneModule,
    ],
    declarations: [
      SpinnerComponent,
      CheckboxComponent,
      ProjectPicturesComponent,
      ProjectPictureDropzonePreviewComponent,
    ],
  },
  component: ProjectFormComponent,
  props: {}
})
