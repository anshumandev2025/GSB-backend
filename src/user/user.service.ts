import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async getAllUser(): Promise<User[]> {
    return this.UserModel.find().select('-user_password').exec();
  }
  //   async updateUser(){
  //     const user=await ()
  //   }
}
