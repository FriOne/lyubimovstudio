import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PictureEntity } from './picture.entity';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PictureEntity,
    ]),
  ],
  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}
