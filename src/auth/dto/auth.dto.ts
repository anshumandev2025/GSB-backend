import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthEmployeeDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SendOTPDTO {
  @IsNotEmpty()
  @IsString()
  country_code: string;

  @IsNotEmpty()
  @IsString()
  mobile_number: string;
}

export class VerifyOTPDTO {
  @IsNotEmpty()
  @IsString()
  country_code: string;

  @IsNotEmpty()
  @IsString()
  mobile_number: string;

  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
