import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ required: true })
  employee_name: string;

  @Prop({ required: true, unique: true })
  employee_email_address: string;

  @Prop({ isRequired: true, unique: true })
  employee_mobile_number: string;

  @Prop({ isRequired: true })
  employee_password: string;

  @Prop({ default: true })
  is_employee_active: boolean;

  @Prop({ default: false })
  is_admin: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
