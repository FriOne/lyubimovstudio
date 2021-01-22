import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import type { ProjectPicture } from '@lyubimovstudio/api-interfaces';

import { PicturesService } from '../../shared/services/pictures.service';

@Component({
  selector: 'ls-project-picture-dropzone-preview',
  templateUrl: './project-picture-dropzone-preview.component.html',
  styleUrls: ['./project-picture-dropzone-preview.component.scss']
})
export class ProjectPictureDropzonePreviewComponent implements OnInit {
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
