import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Diet } from './schema/diet.schema';
import { Model } from 'mongoose';
import { CreateDietDTO, UpdateDietDTO } from './dto/diet.dto';

@Injectable()
export class DietService {
  constructor(@InjectModel(Diet.name) private dietModel: Model<Diet>) {}

  async createDiet(createDietDTO: CreateDietDTO): Promise<Diet> {
    const diet = new this.dietModel({ ...createDietDTO });
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

  async getAllDiets(): Promise<Diet[]> {
    return this.dietModel.find();
  }

  async deleteDiet(id: string) {
    const diet = await this.dietModel.findByIdAndDelete(id);
    if (!diet) {
      throw new Error('Diet not found');
    }
    return { message: 'Diet deleted successfully' };
  }
}
