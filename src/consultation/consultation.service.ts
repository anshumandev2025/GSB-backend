import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Consultation } from './schema/consultation.schema';
import { Model } from 'mongoose';
import { CreateConsultationDTO } from './dto/consultation.dto';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<Consultation>,
  ) {}

  async createConsultation(
    createConsultationDTO: CreateConsultationDTO,
  ): Promise<Consultation> {
    const consultation = new this.consultationModel({
      ...createConsultationDTO,
    });

    return consultation.save();
  }

  async getAllConsultation(): Promise<Consultation[]> {
    return this.consultationModel.find();
  }

  async deleteConsultation(id: string) {
    const consultation = await this.consultationModel.findByIdAndDelete(id);
    if (!consultation) {
      throw new Error('Consultation not found');
    }

    return { message: 'Consultation deleted successfully' };
  }
}
