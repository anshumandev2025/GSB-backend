import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ isRequired: true })
  user_name: string;

  @Prop({ isRequired: true, unique: true })
  user_email_address: string;

  @Prop({ isRequired: true })
  user_mobile_number: string;

  @Prop({ isRequired: true })
  user_goal: string;

  @Prop({ default: true })
  user_isActive: boolean;

  @Prop({ isRequired: true })
  user_password: string;

  @Prop()
  user_otp: string;

  @Prop({ default: false })
  user_isSubscribed: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
