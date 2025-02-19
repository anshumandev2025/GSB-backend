import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct() {
    return this.productService.getAllProducts();
  }

  @Post()
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    return this.productService.createProduct(createProductDTO);
  }

  @Put()
  async updateProduct(@Body() updateProductDTO: UpdateProductDTO) {
    return this.productService.updateProduct(updateProductDTO);
  }

  @Delete(':id')
  async deleteProduct(@Param() params: any) {
    return this.productService.deleteProduct(params.id);
  }
}
