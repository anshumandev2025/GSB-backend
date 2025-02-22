import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';

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

  @ValidateIf((o) => o.type === 'youtube')
  @IsNotEmpty({ message: 'Video URL is required for YouTube videos' })
  @IsUrl({}, { message: 'Invalid URL' })
  video_url?: string;
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
