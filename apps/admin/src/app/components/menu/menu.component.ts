import { Component, Input, ViewChild } from '@angular/core';

type Link = {
  title: string;
  href: string | string[];
};

@Component({
  selector: 'ls-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() links: Link[];

  opened = false;

  onTogglerClick() {
    this.opened = !this.opened;
  }
}
