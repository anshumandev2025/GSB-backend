import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
    return this.orderService.createOrder(createOrderDTO);
  }

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
  @Patch(':id')
  async updateOrderStatus(
    @Param() params: any,
    @Query('status') status: string,
  ) {
    return this.orderService.updateOrderStatus(params.id, status);
  }
}
