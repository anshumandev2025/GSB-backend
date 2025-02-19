import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/product/schema/product.schema';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product_id: Product;

  @Prop({ isRequired: true, default: 'Pending' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
