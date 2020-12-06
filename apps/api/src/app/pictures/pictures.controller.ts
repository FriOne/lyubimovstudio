import {
  Controller, Get,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

import { PicturesService } from './pictures.service';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

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
    const uploadFolder = path.join(__dirname, 'uploads');
    const extension = extname(file.originalname);
    const newFileName = `${uuid()}${extension}`;
    const filePath = `${uploadFolder}/${newFileName}`;

    await mkdir(uploadFolder, { recursive: true } as any);
    await writeFile(filePath, file.buffer);

    return this.picturesService.save({
      name: newFileName,
    });
  }
}
