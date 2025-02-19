import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDTO {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsArray()
  options: string[];
}

export class UpdateQuestionDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsArray()
  options: string[];
}
