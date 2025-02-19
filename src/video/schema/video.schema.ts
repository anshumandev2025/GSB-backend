import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Video extends Document {
  @Prop({ isRequired: true })
  title: string;

  @Prop({ isRequired: true })
  description: string;

  @Prop({ isRequired: true })
  video_url: string;

  @Prop({ isRequired: true })
  category: string;

  @Prop({ isRequired: true, enum: ['general', 'youtube', 'subscribe'] })
  type: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
