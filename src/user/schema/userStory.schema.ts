import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class UserStory extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: User;
  @Prop({ isRequired: true })
  title: string;

  @Prop({ isRequired: true })
  description: string;
  @Prop({ isRequired: true })
  before_image: string;

  @Prop({ isRequired: true })
  after_image: string;
}

export const UserStorySchema = SchemaFactory.createForClass(UserStory);
