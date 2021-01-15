import { IsString, ValidateNested, IsDefined, IsOptional, IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

import { PictureDto } from './picture.dto';
import { ProjectDto } from './project.dto';

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
  @Type(() => ProjectDto)
  project: ProjectDto;
}
