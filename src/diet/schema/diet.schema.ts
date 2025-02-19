import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Diet extends Document {
  @Prop({ isRequired: true })
  title: string;

  @Prop({ isRequired: true })
  description: string;

  @Prop({ isRequired: true })
  category: string;

  @Prop({ isRequired: true, enum: ['general', 'subscribe'] })
  type: string;

  @Prop({ isRequired: true })
  pdf_url: string;
}

export const DietSchema = SchemaFactory.createForClass(Diet);
