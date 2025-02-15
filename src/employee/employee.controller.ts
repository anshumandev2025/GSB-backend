import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }
  @Put()
  async updateEmployee(@Body() updateEmployeeDTO: UpdateEmployeeDTO) {
    return this.employeeService.updateEmployee(updateEmployeeDTO);
  }
  @Delete(':id')
  async deleteEmployeeById(@Param() params: any) {
    return this.employeeService.deleteEmployee(params.id);
  }
}
