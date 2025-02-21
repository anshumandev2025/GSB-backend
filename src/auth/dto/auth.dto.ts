import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthEmployeeDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
