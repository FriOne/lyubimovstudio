import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PictureEntity } from './picture.entity';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PictureEntity,
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}
