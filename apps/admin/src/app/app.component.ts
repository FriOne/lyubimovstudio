import { Component } from '@angular/core';

@Component({
  selector: 'ls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  links = [
    { title: 'Проекты', href: '/projects' },
    { title: 'Картинки', href: '/pictures' },
  ];
}
