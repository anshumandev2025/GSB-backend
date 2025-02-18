import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Post('create')
  async createEmployee(@Body() createEmployeeDTO: CreateEmployeeDTO) {
    return this.employeeService.createEmployee(createEmployeeDTO);
  }
  @Get()
  async getAllEmployees(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('query') query: string,
    @Query('filter') filter: string,
  ) {
    return this.employeeService.getAllEmployees(page, limit, query, filter);
  }
  @Put()
  async updateEmployee(@Body() updateEmployeeDTO: UpdateEmployeeDTO) {
    return this.employeeService.updateEmployee(updateEmployeeDTO);
  }
  @Delete(':id')
  async deleteEmployeeById(@Param() params: any) {
    return this.employeeService.deleteEmployee(params.id);
  }
  @Patch(':id')
  async updateEmployeeStatus(
    @Param() params: any,
    @Query('status') status: boolean,
  ) {
    return this.employeeService.updateEmployeeStatus(params.id, status);
  }
}
