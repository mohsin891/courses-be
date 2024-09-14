import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  url: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  type: 'image' | 'icon';

  @IsNumber()
  priority: number;
}
