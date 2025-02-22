import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schema/question.schema';
import { Model } from 'mongoose';
import { CreateQuestionDTO, UpdateQuestionDTO } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async createQuestion(
    createQuestionDTO: CreateQuestionDTO,
  ): Promise<Question> {
    const question = new this.questionModel({ ...createQuestionDTO });
    return question.save();
  }

  async updateQuestion(updateQuestionDTO: UpdateQuestionDTO) {
    const question = await this.questionModel.findByIdAndUpdate(
      updateQuestionDTO.id,
      { ...updateQuestionDTO },
      { new: true },
    );
    if (!question) {
      throw new Error('Question is not found');
    }
    return question;
  }

  async deleteQuestion(id: string) {
    const question = await this.questionModel.findByIdAndDelete(id);
    if (!question) {
      throw new Error('Question is not found');
    }
    return { meesage: 'Question deleted successfully' };
  }

  async getAllQuestion(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ) {
    const skip = (page - 1) * limit;
    const querFilter: any = {};
    if (search) {
      querFilter.$or = [{ question: { $regex: search, $options: 'i' } }];
    }
    const question = await this.questionModel
      .find(querFilter)
      .skip(skip)
      .limit(limit);
    const total = await this.questionModel.countDocuments();
    return { data: question, total };
  }
}
