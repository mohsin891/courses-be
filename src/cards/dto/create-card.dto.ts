import { IsArray, IsNumber, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TextStyleDto {
  @IsNumber()
  fontSize: number;

  @IsString()
  fontFamily: string;

  @IsString()
  color: string;
}

class BoxStateDto {
  @IsString()
  id: string;

  @IsString()
  parent: string;

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  rotation: number;

  @IsOptional()
  @IsUrl()
  imageUri?: string;

  @IsOptional()
  @IsString()
  textContent?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TextStyleDto)
  textStyle?: TextStyleDto;
}

class LayoutDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;
}

class StyleDto {
  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsString()
  backgroundColor?: string;

  @IsNumber()
  borderRadius: number;
}

class CardDto {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => StyleDto)
  style: StyleDto;

  @IsString()
  viewType: 'linear' | 'radial' | 'color' | 'image';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @IsOptional()
  @IsUrl()
  imageUri?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LayoutDto)
  layout?: LayoutDto;
}

export class CreateCardDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BoxStateDto)
  boxes: BoxStateDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDto)
  card: CardDto[];
}
