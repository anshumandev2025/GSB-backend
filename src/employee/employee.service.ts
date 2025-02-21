import { ConflictException, Injectable } from '@nestjs/common';
import { Employee } from './schema/employee.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto/employee.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private EmployeeModel: Model<Employee>,
  ) {}
  async getAllEmployees(
    page: number = 1,
    limit: number = 10,
    query: string = '',
    filter: string = '',
  ): Promise<{ data: Employee[]; total: number }> {
    const skip = (page - 1) * limit;
    const queryFilter: any = {};
    if (query) {
      queryFilter.$or = [
        { employee_name: { $regex: query, $options: 'i' } }, // Case-insensitive search
        { employee_email_address: { $regex: query, $options: 'i' } },
        { employee_mobile_number: { $regex: query, $options: 'i' } },
      ];
    }
    if (filter) {
      queryFilter.is_employee_active = filter === 'active';
    }
    const employees = await this.EmployeeModel.find(queryFilter)
      .select('-employee_password')
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.EmployeeModel.countDocuments().exec();

    return { data: employees, total };
  }

  async createEmployee(createEmployee: CreateEmployeeDTO): Promise<Employee> {
    const isEmailExist = await this.EmployeeModel.findOne({
      employee_email_address: createEmployee.employee_email_address,
    });
    if (isEmailExist) {
      throw new ConflictException('Email address already exist');
    }
    const isMobileNumberExist = await this.EmployeeModel.findOne({
      employee_mobile_number: createEmployee.employee_mobile_number,
    });
    if (isMobileNumberExist) {
      throw new ConflictException('Mobile number already exist');
    }
    const hashedPassword = await bcrypt.hash(
      createEmployee.employee_password,
      10,
    );
    const newEmployee = new this.EmployeeModel({
      ...createEmployee,
      employee_password: hashedPassword,
    });
    await newEmployee.save();
    newEmployee.employee_password = '';
    return newEmployee;
  }

  async validateEmployee(
    email: string,
    password: string,
  ): Promise<Employee | null> {
    const employee = await this.EmployeeModel.findOne({
      employee_email_address: email,
    });
    if (!employee) return null;

    const isMatch = await bcrypt.compare(password, employee?.employee_password); // 👈 Compare password
    return isMatch ? employee : null;
  }

  async updateEmployee(
    updateEmployeeDTO: UpdateEmployeeDTO,
  ): Promise<Employee> {
    const isEmailExist = await this.EmployeeModel.findOne({
      employee_email_address: updateEmployeeDTO.employee_email_address,
    });
    if (isEmailExist && isEmailExist._id != updateEmployeeDTO.employee_id) {
      throw new ConflictException('Email address already exist');
    }
    const isMobileNumberExist = await this.EmployeeModel.findOne({
      employee_mobile_number: updateEmployeeDTO.employee_mobile_number,
    });
    if (
      isMobileNumberExist &&
      isMobileNumberExist._id != updateEmployeeDTO.employee_id
    ) {
      throw new ConflictException('Mobile number already exist');
    }
    const updateEmployee = await this.EmployeeModel.findByIdAndUpdate(
      updateEmployeeDTO.employee_id,
      {
        employee_email_address: updateEmployeeDTO.employee_email_address,
        employee_name: updateEmployeeDTO.employee_name,
        employee_mobile_number: updateEmployeeDTO.employee_mobile_number,
      },
      { new: true },
    );
    if (!updateEmployee) {
      throw new Error('Employee not found');
    }
    updateEmployee.employee_password = '';
    return updateEmployee;
  }

  async deleteEmployee(id: string) {
    const employee = await this.EmployeeModel.findByIdAndDelete({ _id: id });
    if (!employee) {
      throw new Error('Employee not found');
    }
    return { message: 'Employee deleted successfully' };
  }

  async updateEmployeeStatus(id: string, status: boolean) {
    const employee = await this.EmployeeModel.findByIdAndUpdate(id, {
      is_employee_active: status,
    });
    if (!employee) {
      throw new Error('Employee not found');
    }
    return { message: 'Employee status updated sucsessfully' };
  }
}
