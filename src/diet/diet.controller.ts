import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DietService } from './diet.service';
import { CreateDietDTO, UpdateDietDTO } from './dto/diet.dto';

@Controller('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  async createDiet(@Body() createDietDTO: CreateDietDTO) {
    return this.dietService.createDiet(createDietDTO);
  }

  @Put()
  async updateDiet(@Body() updateDiet: UpdateDietDTO) {
    return this.dietService.updateDiet(updateDiet);
  }

  @Get()
  async getAllDiets() {
    return this.dietService.getAllDiets();
  }

  @Delete(':id')
  async deleteDiet(@Param() params: any) {
    return this.dietService.deleteDiet(params.id);
  }
}
