import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import {
  CreateUserDTO,
  CreateUserStoryDTO,
  CreateUserUpdateDTO,
  EditUserStoryDTO,
  EditUserUpdateDTO,
  UpdateUserDTO,
} from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserStory } from './schema/userStory.schema';
import { UserUpdate } from './schema/userUpdate.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(UserStory.name) private UserStoryModel: Model<UserStory>,
    @InjectModel(UserUpdate.name) private UserUpdateModel: Model<UserUpdate>,
  ) {}

  //user Info services
  async getAllUser(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    filter: string = '',
    isSubscribed: boolean | null = null,
  ) {
    const skip = (page - 1) * 10;
    const queryFilter: any = {};
    if (search) {
      queryFilter.$or = [
        {
          user_name: { $regex: search, $options: 'i' },
        },
        {
          user_email_address: { $regex: search, $options: 'i' },
        },
        {
          user_mobile_number: { $regex: search, $options: 'i' },
        },
      ];
    }
    if (filter) {
      queryFilter.user_goal = filter;
    }
    if (isSubscribed) {
      queryFilter.user_isSubscribed = isSubscribed;
    }
    const users = await this.UserModel.find(queryFilter)
      .select('-user_password')
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.UserModel.countDocuments(queryFilter);

    return { data: users, total };
  }

  async createUserService(createUserDTO: CreateUserDTO) {
    const isEmailExist = await this.UserModel.findOne({
      user_email_address: createUserDTO.user_email_address,
    });
    if (isEmailExist) {
      throw new ConflictException('Email address already exist');
    }
    const isMobileNumberExist = await this.UserModel.findOne({
      user_mobile_number: createUserDTO.user_mobile_number,
    });
    if (isMobileNumberExist) {
      throw new ConflictException('Mobile number already exist');
    }
    const hashedPassword = await bcrypt.hash(createUserDTO.user_password, 10);
    const newUser = new this.UserModel({
      ...createUserDTO,
      user_password: hashedPassword,
    });
    await newUser.save();
    newUser.user_password = '';
    return newUser;
  }

  async updateUserService(updateUserDTO: UpdateUserDTO) {
    const isEmailExist = await this.UserModel.findOne({
      user_email_address: updateUserDTO.user_email_address,
      _id: { $ne: updateUserDTO.user_id },
    });
    if (isEmailExist) {
      throw new ConflictException('Email address already exist');
    }
    const isMobileNumberExist = await this.UserModel.findOne({
      user_mobile_number: updateUserDTO.user_mobile_number,
      _id: { $ne: updateUserDTO.user_id },
    });
    if (isMobileNumberExist) {
      throw new ConflictException('Mobile number already exist');
    }
    const user = await this.UserModel.findByIdAndUpdate(
      updateUserDTO.user_id,
      {
        ...updateUserDTO,
      },
      { new: true },
    );
    if (!user) {
      throw new Error('User not found');
    }
    user.user_password = '';
    return user;
  }

  async deleteUserService(id: string) {
    const user = await this.UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  //user update services
  async getAllUsersUpdates(page: number, limit: number, search: string) {
    const queryFilter: any = {};
    if (search) {
      queryFilter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { descriptions: { $regex: search, $options: 'i' } },
        { 'users_id.user_name': { $regex: search, $options: 'i' } },
        { 'users_id.user_email_address': { $regex: search, $options: 'i' } },
      ];
    }
    return this.UserUpdateModel.find({});
  }

  async getUserUpdateById(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    const userUpdates = await this.UserUpdateModel.find({ user_id: userId })
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.UserUpdateModel.countDocuments();
    return { data: userUpdates, total };
  }
  async createUserUpdate(
    createUserUpdate: CreateUserUpdateDTO,
  ): Promise<UserUpdate> {
    const newUpdate = new this.UserUpdateModel({
      ...createUserUpdate,
    });
    return newUpdate.save();
  }

  async deleteUserUpdate(updateId: string) {
    const update = await this.UserUpdateModel.findByIdAndDelete(updateId);
    if (!update) {
      throw new Error('Update is not found');
    }
    return { message: 'Update is deleted' };
  }

  async deleteUserUpdateByUserId(userId: string) {
    const update = await this.UserUpdateModel.deleteMany({ user_id: userId });
    if (!update) {
      throw new Error('Update is not found');
    }
    return { message: 'Update is deleted' };
  }

  async updateUsetUpdates(editUserUpdateDTO: EditUserUpdateDTO) {
    const update = await this.UserUpdateModel.findByIdAndUpdate(
      editUserUpdateDTO.id,
      {
        ...editUserUpdateDTO,
      },
      { new: true },
    );
    if (!update) {
      throw new Error('Update is not found');
    }
    return update;
  }

  //user story services
  async getAllUsersStory(): Promise<UserStory[]> {
    return this.UserStoryModel.find();
  }

  async getAllStoryByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const userStory = await this.UserStoryModel.find({ user_id: userId })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.UserModel.countDocuments();
    return { data: userStory, total };
  }

  async createUserStory(
    createUserStoryDTO: CreateUserStoryDTO,
  ): Promise<UserStory> {
    const story = new this.UserStoryModel({
      ...createUserStoryDTO,
    });
    await story.save();
    return story;
  }

  async updateUserStory(editUserStoryDTO: EditUserStoryDTO) {
    const story = this.UserStoryModel.findByIdAndUpdate(
      editUserStoryDTO.id,
      { ...editUserStoryDTO },
      { new: true },
    );
    console.log('story-->', story);
    if (!story) {
      throw new Error('Story is not found');
    }
    return story;
  }
  async deleteStory(storyId: string) {
    const story = await this.UserStoryModel.findByIdAndDelete(storyId);
    if (!story) {
      throw new Error('Story is not found');
    }
    return { message: 'Story is deleted successfully' };
  }
  async deleteStoryByUserId(userId: string) {
    const story = await this.UserStoryModel.deleteMany({ user_id: userId });
    if (!story) {
      throw new Error('Story is not found');
    }
    return { message: 'Story is deleted successfully' };
  }

  async getUserByPhoneNumber(number: string) {
    const user = this.UserModel.findOne({ user_mobile_number: number });
    return user;
  }

  async updateUserOTP(userId: any, otp: number) {
    const user = await this.UserModel.findByIdAndUpdate(userId, {
      user_otp: otp,
    });
    if (!user) {
      throw new Error('User not updated');
    }
    return user;
  }

  async verifyUserOTP(
    mobile_number: string,
    otp: number,
  ): Promise<User | null> {
    return this.UserModel.findOne({
      user_mobile_number: mobile_number,
      user_otp: otp,
    });
  }
}
