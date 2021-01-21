import { Component, Input } from '@angular/core';

@Component({
  selector: 'ls-picture-image-link',
  templateUrl: './picture-image-link.component.html',
  styleUrls: ['./picture-image-link.component.scss']
})
export class PictureImageLinkComponent {
  @Input() url: string;
}
