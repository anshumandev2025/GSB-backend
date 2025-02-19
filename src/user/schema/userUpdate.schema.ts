import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class UserUpdate extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: User;
  @Prop({ isRequired: true })
  title: string;

  @Prop({ isRequired: true })
  descriptions: string;

  @Prop({ isRequired: true })
  image: string;
}

export const UserUpdateSchema = SchemaFactory.createForClass(UserUpdate);
