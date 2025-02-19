import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateVideoDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['general', 'youtube', 'subscribe'])
  type: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsUrl()
  video_url: string;
}

export class UpdateVideoDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['general', 'youtube', 'subscribe'])
  type: string;

  @IsNotEmpty()
  @IsUrl()
  video_url: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
