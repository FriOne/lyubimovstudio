import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Picture } from '@lyubimovstudio/api-interfaces';

import { PicturesService } from '../../shared/services/pictures.service';

@Component({
  selector: 'ls-picture-dropzone-preview',
  templateUrl: './picture-dropzone-preview.component.html',
  styleUrls: ['./picture-dropzone-preview.component.scss']
})
export class PictureDropzonePreviewComponent implements OnChanges {
  @Input() picture?: Picture;
  @Output() removed = new EventEmitter<Picture>();

  imageSrc?: string;

  constructor(private pictureService: PicturesService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.picture.currentValue) {
      return;
    }

    this.imageSrc = this.pictureService.getPicturePath(this.picture.name);
  }

  onRemoveClick(event: MouseEvent) {
    event.stopPropagation();

    this.removed.next(this.picture);
  }
}
