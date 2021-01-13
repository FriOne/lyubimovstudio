import { IsString, IsOptional, IsInt } from 'class-validator';

export class TagDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  name: string;
}
