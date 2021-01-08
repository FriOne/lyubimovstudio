import { text } from '@storybook/addon-knobs';

import { PictureImageLinkComponent } from './picture-image-link.component';

export default {
  title: 'PictureImageLinkComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: PictureImageLinkComponent,
  props: {
    url: text('url', 'test.jpg'),
  }
})
