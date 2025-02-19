import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUrl,
} from 'class-validator';
export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  user_email_address: string;

  @IsString()
  @IsMobilePhone()
  @IsNotEmpty()
  user_mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  user_password: string;
}

export class UpdateUserDTO {
  @IsString()
  user_id: string;

  @IsString()
  user_name: string;

  @IsString()
  @IsEmail()
  user_email_address: string;

  @IsString()
  @IsMobilePhone()
  user_mobile_number: string;
}

export class CreateUserUpdateDTO {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;
}

export class EditUserUpdateDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;
}

export class CreateUserStoryDTO {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  before_image: string;

  @IsNotEmpty()
  @IsUrl()
  after_image: string;
}

export class EditUserStoryDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  before_image: string;

  @IsNotEmpty()
  @IsUrl()
  after_image: string;
}
