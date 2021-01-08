
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { PictureDropzonePreviewComponent } from '../picture-dropzone-preview/picture-dropzone-preview.component';
import { PictureControlComponent } from './picture-control.component';

export default {
  title: 'PictureControlComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      HttpClientTestingModule,
      NgxDropzoneModule,
    ],
    declarations: [
      PictureDropzonePreviewComponent,
    ],
  },
  component: PictureControlComponent,
  props: {}
})
