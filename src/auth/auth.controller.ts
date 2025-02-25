import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEmployeeDTO, SendOTPDTO, VerifyOTPDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/employee')
  async loginAdmin(@Body() authEmployeeDTO: AuthEmployeeDTO) {
    return this.authService.loginEmployee(authEmployeeDTO);
  }
  @Post('/sendOtp')
  async sendOTP(@Body() sendOtpDTO: SendOTPDTO) {
    return this.authService.sendOTP(sendOtpDTO);
  }
  @Post('/verifyOtp')
  async verifyOTP(@Body() verifyOtpDTO: VerifyOTPDTO) {
    return this.authService.verifyOTP(verifyOtpDTO);
  }
}
