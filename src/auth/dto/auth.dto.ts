import { IsString } from 'class-validator';
export class RefreshDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
