import { Component, ElementRef, HostListener, Input } from '@angular/core';
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.opened = false;
    }
  }

  constructor(
    private eRef: ElementRef,
    private router: Router,
    private authService: AuthService,
  ) {}

  onTogglerClick() {
    this.opened = !this.opened;
  }

  onLinkClick() {
    this.opened = false;
  }

  onLogOutClick(event: MouseEvent) {
    event.preventDefault();

    this.opened = false;
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
