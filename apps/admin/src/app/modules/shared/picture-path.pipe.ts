import { Pipe, PipeTransform } from '@angular/core';

import { PicturesService } from './services/pictures.service';

@Pipe({
  name: 'picturePath'
})
export class PicturePathPipe implements PipeTransform {
  constructor(private picturesService: PicturesService) {}

  transform(pictureName: string): string {
    return this.picturesService.getPicturePath(pictureName);
  }
}
