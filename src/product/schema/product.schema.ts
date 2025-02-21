import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  price: number;

  @Prop({ isRequired: true })
  description: string;

  @Prop({ isRequired: true })
  category: string;

  @Prop({ isRequired: true })
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
