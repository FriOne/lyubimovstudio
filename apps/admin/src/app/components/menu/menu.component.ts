import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../modules/auth/auth.service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onTogglerClick() {
    this.opened = !this.opened;
  }

  onLogOutClick(event: MouseEvent) {
    event.preventDefault();

    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
