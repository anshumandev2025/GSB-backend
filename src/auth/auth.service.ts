import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { AuthEmployeeDTO, SendOTPDTO, VerifyOTPDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private twilioClient: Twilio;
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.twilioClient = new Twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTHTOKEN'),
    );
  }

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

  async sendOTP(sendOtpDTO: SendOTPDTO) {
    const user = await this.userService.getUserByPhoneNumber(
      sendOtpDTO.mobile_number,
    );
    if (!user) {
      throw new NotFoundException('User with this mobile number not found');
    }
    const otp = Math.floor(100000 + Math.random() * 900000);

    const message = await this.twilioClient.messages.create({
      body: `Your verification code is: ${otp}. Valid for 10 minutes.`,
      from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
      to: `${sendOtpDTO.country_code}${sendOtpDTO.mobile_number}`,
    });
    const updateUser = await this.userService.updateUserOTP(user?._id, otp);
    return { message: 'Otp send successfully to the registerd mobile number' };
  }

  async verifyOTP(verifyOtpDTO: VerifyOTPDTO) {
    const user = await this.userService.verifyUserOTP(
      verifyOtpDTO.mobile_number,
      verifyOtpDTO.otp,
    );
    if (!user) {
      throw new BadRequestException('Invalid OTP. Please try again.');
    }
    const payload = {
      id: user._id,
      email: user.user_email_address,
    };
    const token = this.jwtService.sign(payload);
    return { message: 'You are verified successfully', token };
  }
}
