import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { forkJoin, noop } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import type { ProjectPicture } from '@lyubimovstudio/api-interfaces';

import { ProjectPictureModalFormComponent } from '../project-picture-modal-form/project-picture-modal-form.component';
import { ProjectPictureService } from '../project-picture.service';

@Component({
  selector: 'ls-project-pictures',
  templateUrl: './project-pictures.component.html',
  styleUrls: ['./project-pictures.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProjectPicturesComponent),
    multi: true,
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => ProjectPicturesComponent),
    multi: true
  }]
})
export class ProjectPicturesComponent implements ControlValueAccessor {
  pictures: ProjectPicture[] = [];
  disabled = false;

  // eslint-disable-next-line
  private onChange = (pictures: ProjectPicture[]) => {};
  private onTouched = noop;
  private loadQueue = 0;

  constructor(
    private projectPictureService: ProjectPictureService,
    private dialog: MatDialog,
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pictures, event.previousIndex, event.currentIndex);

    this.updateValue(this.pictures.map((picture, index) => ({ ...picture, order: index })));
  }

  // eslint-disable-next-line
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // eslint-disable-next-line
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(pictures: ProjectPicture[]) {
    this.pictures = pictures || [];
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateValue(pictures: ProjectPicture[]) {
    this.pictures = pictures;
    this.onChange(pictures);
    this.onTouched();
  }

  validate() {
    return (this.loadQueue !== 0) && {
      invalid: true,
    };
  }

  loadProjectPictureWithFile(file: File) {
    return this.projectPictureService
      .createNew(file)
      .pipe(
        map(projectPicture => ({
          ...projectPicture,
          order: this.pictures.length,
        }))
      );
  }

  onSelectFiles(event: NgxDropzoneChangeEvent) {
    this.loadQueue++;

    forkJoin(
      event.addedFiles.map<ProjectPicture>(this.loadProjectPictureWithFile.bind(this))
    ).subscribe(pictures => {
      this.loadQueue--;
      this.updateValue([...this.pictures, ...pictures]);
    });
  }

  onRemoveFile(picture: ProjectPicture) {
    const pictures = [...this.pictures];
    const pictureIndex = pictures.indexOf(picture);

    pictures.splice(pictureIndex, 1);

    this.updateValue(pictures);
  }

  onEdit(projectPicture: ProjectPicture, index: number) {
    const modalRef = this.dialog.open(ProjectPictureModalFormComponent, {
      data: { projectPicture },
    });

    modalRef.afterClosed().subscribe((projectPicture: ProjectPicture) => {
      this.onModalClose(projectPicture, index);
    });
  }

  onModalClose(projectPicture: ProjectPicture, index: number) {
    const prevProjectPicture = this.pictures[index];

    for (const tag of projectPicture.tags || []) {
      if (typeof tag.id === 'string') {
        delete tag.id;
      }
    }

    const updatedProjectPicture = {
      ...prevProjectPicture,
      ...projectPicture,
    };

    this.loadQueue++;
    this.projectPictureService
      .save(updatedProjectPicture.id, updatedProjectPicture)
      .subscribe((newProjectPicture) => {
        this.loadQueue--;

        const pictures = [...this.pictures];
        const newProjectPictureIndex = pictures.findIndex(picture => (picture.id === newProjectPicture.id));

        pictures.splice(newProjectPictureIndex, 1, newProjectPicture);

        this.updateValue(pictures);
      });
  }
}
