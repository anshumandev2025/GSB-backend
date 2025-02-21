import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { AuthEmployeeDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async loginEmployee(authEmployeeDTO: AuthEmployeeDTO) {
    const employee = await this.employeeService.validateEmployee(
      authEmployeeDTO.email,
      authEmployeeDTO.password,
    );
    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      id: employee._id,
      email: employee.employee_email_address,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      user: {
        id: employee._id,
        email: employee.employee_email_address,
        is_admin: employee.is_admin,
      },
    };
  }
}
