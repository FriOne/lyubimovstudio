import { Component } from '@angular/core';

@Component({
  selector: 'ls-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  links = [
    { title: 'Проекты', href: '/projects' },
    { title: 'До и После', href: '/before-and-after' },
    { title: 'Теги', href: '/tags' },
    { title: 'Картинки', href: '/pictures' },
  ];
}
