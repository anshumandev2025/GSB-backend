import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('filter') filter: string,
  ) {
    return this.productService.getAllProducts(page, limit, search, filter);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    return this.productService.createProduct(createProductDTO, image);
  }

  @Put()
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    return this.productService.updateProduct(updateProductDTO, image);
  }

  @Delete(':id')
  async deleteProduct(@Param() params: any) {
    return this.productService.deleteProduct(params.id);
  }
}
