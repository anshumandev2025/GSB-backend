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

  @IsNotEmpty()
  @IsBoolean()
  is_multiple_correct: boolean;
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
