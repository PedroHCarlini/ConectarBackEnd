import { IsEmail, IsString } from 'class-validator';

export class AuthenticateDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
