import { Injectable } from '@nestjs/common';
import { Product } from './schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { S3Service } from 'src/common/s3.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly s3Service: S3Service,
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  async createProduct(
    createProductDTO: CreateProductDTO,
    file: Express.Multer.File,
  ): Promise<Product> {
    const imageUrl = await this.s3Service.uploadFile(file);
    const product = new this.ProductModel({
      ...createProductDTO,
      image: imageUrl.url,
    });
    return product.save();
  }

  async getAllProducts(): Promise<Product[]> {
    return this.ProductModel.find();
  }

  async updateProduct(updateProductDTO: UpdateProductDTO) {
    const product = await this.ProductModel.findByIdAndUpdate(
      updateProductDTO.id,
      { ...updateProductDTO },
      { new: true },
    );
    if (!product) {
      throw new Error('Prodcut is not found');
    }
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.ProductModel.findByIdAndDelete(id);
    if (!product) {
      throw new Error('Prodcut is not found');
    }
    return { message: 'Product deleted successfully' };
  }
}
