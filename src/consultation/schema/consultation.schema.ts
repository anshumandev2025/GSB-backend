import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Consultation extends Document {
  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  email: string;

  @Prop({ isRequired: true })
  mobile: string;

  @Prop({ isRequired: true })
  message: string;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
