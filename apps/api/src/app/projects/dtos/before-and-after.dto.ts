import { IsString, ValidateNested, IsDefined, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

import { PictureDto } from './picture.dto';
import { BeforeAndAfterProjectDto } from './before-and-after-project.dto';

export class BeforeAndAfterDto {
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

  @IsBoolean()
  isPublished: boolean;

  @IsDefined()
  @ValidateNested()
  @Type(() => PictureDto)
  before: PictureDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => PictureDto)
  after: PictureDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => BeforeAndAfterProjectDto)
  project: BeforeAndAfterProjectDto;
}
