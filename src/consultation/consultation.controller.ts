import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDTO } from './dto/consultation.dto';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  async createConsultation(
    @Body() createConsultationDTO: CreateConsultationDTO,
  ) {
    return this.consultationService.createConsultation(createConsultationDTO);
  }

  @Get()
  async getAllConsultation() {
    return this.consultationService.getAllConsultation();
  }

  @Delete(':id')
  async deleteConsultation(@Param() params: any) {
    return this.consultationService.deleteConsultation(params.id);
  }
}
