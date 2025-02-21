import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct() {
    return this.productService.getAllProducts();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    return this.productService.createProduct(createProductDTO, file);
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
