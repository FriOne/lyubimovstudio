
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuComponent } from '../menu/menu.component';
import { LayoutComponent } from './layout.component';

export default {
  title: 'LayoutComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
    ],
    declarations: [MenuComponent],
  },
  component: LayoutComponent,
  props: {}
})
