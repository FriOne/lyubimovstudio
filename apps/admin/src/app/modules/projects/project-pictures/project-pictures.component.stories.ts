
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { ProjectPictureDropzonePreviewComponent } from '../project-picture-dropzone-preview/project-picture-dropzone-preview.component';
import { ProjectPicturesComponent } from './project-pictures.component';

export default {
  title: 'ProjectPicturesComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      MatDialogModule,
      HttpClientTestingModule,
      NgxDropzoneModule,
    ],
    declarations: [
      ProjectPictureDropzonePreviewComponent,
    ],
  },
  component: ProjectPicturesComponent,
  props: {}
})
