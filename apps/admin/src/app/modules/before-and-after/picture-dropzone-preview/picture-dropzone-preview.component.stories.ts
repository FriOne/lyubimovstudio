import { HttpClientTestingModule } from '@angular/common/http/testing';
import { object } from '@storybook/addon-knobs';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { PictureDropzonePreviewComponent } from './picture-dropzone-preview.component';

export default {
  title: 'PictureDropzonePreviewComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      NgxDropzoneModule,
    ]
  },
  component: PictureDropzonePreviewComponent,
  props: {
    picture: object('picture', { id: 1, name: 'test.jpg' }),
    removed: () => console.log('removed'),
  }
})
