import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { noop } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Picture, ProjectPicture } from '@lyubimovstudio/api-interfaces';

import { PicturesService } from '../../pictures/pictures.service';

@Component({
  selector: 'ls-project-pictures',
  templateUrl: './project-pictures.component.html',
  styleUrls: ['./project-pictures.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProjectPicturesComponent),
    multi: true,
  }]
})
export class ProjectPicturesComponent implements ControlValueAccessor {
  pictures: ProjectPicture[] = [];
  disabled = false;
  private onChange = (pictures: ProjectPicture[]) => {};
  private onTouched = noop;

  constructor(private picturesService: PicturesService) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pictures, event.previousIndex, event.currentIndex);

    this.updateValue(this.pictures.map((picture, index) => ({ ...picture, order: index })));
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

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

  onSelectFiles(event: NgxDropzoneChangeEvent) {
    for (const file of event.addedFiles) {
      this.picturesService
        .uploadPicture(file)
        .pipe(
          filter(event => (event.type === HttpEventType.Response)),
          map(event => ({
            image: (event as HttpResponse<Picture>).body,
            order: this.pictures.length,
          }))
        )
        .subscribe(picture => {
          this.updateValue([...this.pictures, picture]);
        });
    }
  }

  onRemoveFile(picture: ProjectPicture) {
    const pictures = [...this.pictures];
    const pictureIndex = pictures.indexOf(picture);

    pictures.splice(pictureIndex, 1);

    this.updateValue(pictures);
  }
}
