import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateEmployeeDTO {
  @IsString()
  @IsNotEmpty()
  employee_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  employee_email_address: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  employee_mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  employee_password: string;
}

export class UpdateEmployeeDTO {
  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  employee_name: string;

  @IsString()
  @IsEmail()
  employee_email_address: string;

  @IsString()
  @IsMobilePhone()
  employee_mobile_number: string;
}
