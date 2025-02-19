import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDTO, UpdateQuestionDTO } from './dto/question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post()
  async createQuestion(@Body() createQuestionDTO: CreateQuestionDTO) {
    return this.questionService.createQuestion(createQuestionDTO);
  }

  @Put()
  async updateQuestion(@Body() updateQuestionDTO: UpdateQuestionDTO) {
    return this.questionService.updateQuestion(updateQuestionDTO);
  }

  @Get()
  async getAllQuestion() {
    return this.questionService.getAllQuestion();
  }

  @Delete(':id')
  async deleteQuestion(@Param() params: any) {
    return this.questionService.deleteQuestion(params.id);
  }
}
