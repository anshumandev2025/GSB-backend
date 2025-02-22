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
import { DietService } from './diet.service';
import { CreateDietDTO, UpdateDietDTO } from './dto/diet.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createDiet(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDietDTO: CreateDietDTO,
  ) {
    return this.dietService.createDiet(createDietDTO, file);
  }

  @Put()
  async updateDiet(@Body() updateDiet: UpdateDietDTO) {
    return this.dietService.updateDiet(updateDiet);
  }

  @Get()
  async getAllDiets(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
  ) {
    return this.dietService.getAllDiets(page, limit, search);
  }

  @Delete(':id')
  async deleteDiet(@Param() params: any) {
    return this.dietService.deleteDiet(params.id);
  }
}
