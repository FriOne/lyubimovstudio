import { HttpClientTestingModule } from '@angular/common/http/testing';
import { object } from '@storybook/addon-knobs';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { ProjectPictureDropzonePreviewComponent } from './project-picture-dropzone-preview.component';

export default {
  title: 'ProjectPictureDropzonePreviewComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      NgxDropzoneModule,
    ]
  },
  component: ProjectPictureDropzonePreviewComponent,
  props: {
    projectPicture: object('projectPicture', { id: 1, image: { id: 1, name: 'test.jpg' }}),
    removed: () => console.log('removed'),
  }
})
