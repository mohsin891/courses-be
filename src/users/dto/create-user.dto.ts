import { IsBoolean, IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
  @IsBoolean()
  email_verified: boolean;

  @IsString()
  displayName: string;

  @IsString()
  role: "admin" | "user" | "instructor";

  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  picture: string;

  @IsString()
  uid: string;
}
