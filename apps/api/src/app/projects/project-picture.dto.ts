import { IsString, IsNotEmpty, ValidateNested, IsDefined, Allow, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { PictureDto } from './picture.dto';

export class ProjectPictureDto {
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  ruTitle?: string;

  @IsString()
  @IsOptional()
  enTitle?: string;

  @IsString()
  @IsOptional()
  ruDescription?: string;

  @IsString()
  @IsOptional()
  enDescription?: string;

  @Allow()
  @IsNotEmpty()
  order: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => PictureDto)
  image: PictureDto;
}
