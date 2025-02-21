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

  async getAllProducts(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    filter: string = '',
  ) {
    const skip = (page - 1) * limit;
    const queryFilter: any = {};
    if (search) {
      queryFilter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (filter) {
      queryFilter.category = filter;
    }
    const products = await this.ProductModel.find(queryFilter)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.ProductModel.countDocuments().exec();
    return { data: products, total };
  }

  async updateProduct(
    updateProductDTO: UpdateProductDTO,
    file: Express.Multer.File,
  ) {
    if (file) {
      const productDetails = await this.ProductModel.findById(
        updateProductDTO.id,
      );
      //@ts-ignore
      const key = new URL(productDetails?.image).pathname.substring(1);
      await this.s3Service.updateFile(key, file);
    }
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
    //@ts-ignore
    const key = new URL(product?.image).pathname.substring(1);
    await this.s3Service.deleteFile(key);
    if (!product) {
      throw new Error('Product is not found');
    }
    return { message: 'Product deleted successfully' };
  }
}
