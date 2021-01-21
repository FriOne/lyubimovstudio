import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { noop } from 'rxjs';

import { Picture } from '@lyubimovstudio/api-interfaces';

import { PicturesService } from '../../shared/services/pictures.service';

@Component({
  selector: 'ls-picture-control',
  templateUrl: './picture-control.component.html',
  styleUrls: ['./picture-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PictureControlComponent),
    multi: true,
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PictureControlComponent),
    multi: true
  }]
})
export class PictureControlComponent implements ControlValueAccessor {
  picture: Picture;
  disabled = false;
  // eslint-disable-next-line
  private onChange = (picture?: Picture) => {};
  private onTouched = noop;
  private loadQueue = 0;

  constructor(private prictureService: PicturesService) {}

  // eslint-disable-next-line
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // eslint-disable-next-line
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(picture: Picture) {
    this.picture = picture;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateValue(picture?: Picture) {
    this.picture = picture;
    this.onChange(picture);
    this.onTouched();
  }

  validate() {
    return ((this.loadQueue !== 0) || !this.picture) && {
      invalid: true,
    };
  }

  onSelectFile(event: NgxDropzoneChangeEvent) {
    this.loadQueue++;

    this.prictureService
      .uploadPicture(event.addedFiles[0])
      .subscribe((picture) => {
        this.loadQueue--;
        this.updateValue(picture);
      });
  }

  onRemoveFile() {
    this.updateValue();
  }
}
