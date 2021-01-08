import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { object } from '@storybook/addon-knobs';

import { MenuComponent } from './menu.component';

export default {
  title: 'MenuComponent'
}

const links = [
  { title: 'Проекты', href: '/projects' },
  { title: 'До и После', href: '/before-and-after' },
  { title: 'Теги', href: '/tags' },
  { title: 'Картинки', href: '/pictures' },
];

export const primary = () => ({
  moduleMetadata: {
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
    ],
  },
  component: MenuComponent,
  props: {
    links: object('links', links),
  }
})
