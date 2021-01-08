
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { PicturePathPipe } from '../../shared/picture-path.pipe';
import { PictureImageLinkComponent } from './picture-image-link/picture-image-link.component';
import { PicturesListComponent } from './pictures-list.component';

export default {
  title: 'PicturesListComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
    ],
    declarations: [
      PictureImageLinkComponent,
      SpinnerComponent,
      PicturePathPipe,
    ],
  },
  component: PicturesListComponent,
  props: {}
})
