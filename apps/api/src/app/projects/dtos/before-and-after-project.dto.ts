import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class BeforeAndAfterProjectDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  ruTitle: string;

  @IsString()
  @IsOptional()
  enTitle?: string;
}
