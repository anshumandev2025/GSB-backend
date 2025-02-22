import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDTO, UpdateQuestionDTO } from './dto/question.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post()
  async createQuestion(@Body() createQuestionDTO: CreateQuestionDTO) {
    console.log('create dto-->', createQuestionDTO);
    return this.questionService.createQuestion(createQuestionDTO);
  }

  @Put()
  async updateQuestion(@Body() updateQuestionDTO: UpdateQuestionDTO) {
    return this.questionService.updateQuestion(updateQuestionDTO);
  }

  @Get()
  async getAllQuestion(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
  ) {
    return this.questionService.getAllQuestion(page, limit, search);
  }

  @Delete(':id')
  async deleteQuestion(@Param() params: any) {
    return this.questionService.deleteQuestion(params.id);
  }
}
