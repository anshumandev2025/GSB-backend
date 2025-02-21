import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEmployeeDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/employee')
  async loginAdmin(@Body() authEmployeeDTO: AuthEmployeeDTO) {
    return this.authService.loginEmployee(authEmployeeDTO);
  }
}
