import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Diet } from './schema/diet.schema';
import { Model } from 'mongoose';
import { CreateDietDTO, UpdateDietDTO } from './dto/diet.dto';
import { S3Service } from 'src/common/s3.service';
import { url } from 'inspector';

@Injectable()
export class DietService {
  constructor(
    @InjectModel(Diet.name) private dietModel: Model<Diet>,
    private readonly s3Service: S3Service,
  ) {}

  async createDiet(
    createDietDTO: CreateDietDTO,
    file: Express.Multer.File,
  ): Promise<Diet> {
    const pdfUrl = await this.s3Service.uploadFile(file);
    const diet = new this.dietModel({ ...createDietDTO, pdf_url: pdfUrl.url });
    return diet.save();
  }

  async updateDiet(updateDiet: UpdateDietDTO) {
    const diet = await this.dietModel.findByIdAndUpdate(
      updateDiet.id,
      {
        ...updateDiet,
      },
      { new: true },
    );
    if (!diet) {
      throw new Error('Diet not found');
    }
    return diet;
  }

  async getAllDiets(page: number = 1, limit: number = 10, search: string = '') {
    const skip = (page - 1) * limit;
    const queryFilter: any = {};
    if (search) {
      queryFilter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const diets = await this.dietModel
      .find(queryFilter)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.dietModel.countDocuments();
    return { data: diets, total };
  }

  async deleteDiet(id: string) {
    const diet = await this.dietModel.findByIdAndDelete(id);
    //@ts-ignore
    const key = new URL(diet?.pdf_url).pathname.substring(1);
    await this.s3Service.deleteFile(key);
    if (!diet) {
      throw new Error('Diet not found');
    }
    return { message: 'Diet deleted successfully' };
  }
}
