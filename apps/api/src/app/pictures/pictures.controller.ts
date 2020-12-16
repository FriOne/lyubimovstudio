import {
  Controller, Get,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PicturesService } from './pictures.service';

@Controller('pictures')
export class PicturesController {
  constructor(private picturesService: PicturesService) {}

  @Get('')
  async findAll() {
    return this.picturesService.findAll();
  }

  @Put('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const newFileName = await this.picturesService.saveFile(file);

    return this.picturesService.save({ name: newFileName });
  }
}
