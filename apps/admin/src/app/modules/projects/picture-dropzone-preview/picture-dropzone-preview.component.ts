import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

import { ProjectPicture } from '@lyubimovstudio/api-interfaces';

import { PicturesService } from '../../pictures/pictures.service';

@Component({
  selector: 'ls-picture-dropzone-preview',
  templateUrl: './picture-dropzone-preview.component.html',
  styleUrls: ['./picture-dropzone-preview.component.scss']
})
export class PictureDropzonePreviewComponent implements OnInit {
  @Input() projectPicture?: ProjectPicture;
  @Output() removed = new EventEmitter<ProjectPicture>();
  @Output() edit = new EventEmitter<ProjectPicture>();

  imageSrc?: string;

  constructor(private pictureService: PicturesService) {}

  ngOnInit() {
    this.imageSrc = this.pictureService.getPicturePath(this.projectPicture.image.name);
  }

  onRemoveClick(event: MouseEvent) {
    event.stopPropagation();

    this.removed.next(this.projectPicture);
  }

  onEditClick(event: MouseEvent) {
    event.stopPropagation();

    this.edit.next(this.projectPicture);
  }
}
