import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ isRequired: true })
  question: string;

  @Prop({ isRequired: true })
  category: string;

  @Prop({ type: [String], isRequired: true })
  options: string[];

  @Prop({ default: false })
  is_multiple_correct: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
