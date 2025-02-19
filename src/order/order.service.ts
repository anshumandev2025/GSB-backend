import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
    const order = new this.orderModel({ ...createOrderDTO });
    return order.save();
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async updateOrderStatus(id: string, status: string) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}
