import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDTO,
  CreateUserStoryDTO,
  CreateUserUpdateDTO,
  EditUserStoryDTO,
  EditUserUpdateDTO,
  UpdateUserDTO,
} from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //user info controller
  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUserService(createUserDTO);
  }
  @Put()
  async updateUser(@Body() updateUserDTO: UpdateUserDTO) {
    return this.userService.updateUserService(updateUserDTO);
  }
  @Delete(':id')
  async deleteUser(@Param() params: any) {
    return this.userService.deleteUserService(params.id);
  }

  //user story
  @Post('story')
  async createUserStory(@Body() createUserStoryDTO: CreateUserStoryDTO) {
    return this.userService.createUserStory(createUserStoryDTO);
  }
  @Get('story')
  async getAllStory() {
    return this.userService.getAllUsersStory();
  }
  @Get('story/:id')
  async getAllStoryByUserId(@Param() params: any) {
    return this.userService.getAllStoryByUserId(params.id);
  }

  @Put('story')
  async updateUserStory(@Body() updateUserStoryDTO: EditUserStoryDTO) {
    return this.userService.updateUserStory(updateUserStoryDTO);
  }

  @Delete('story/:id')
  async deleteStoryById(@Param() params: any) {
    return this.userService.deleteStory(params.id);
  }

  @Delete('story/all/:id')
  async deleteStoryByUserId(@Param() params: any) {
    return this.userService.deleteStoryByUserId(params.id);
  }

  // user updates
  @Post('update')
  async createUserUpdate(@Body() createUserUpdateDTO: CreateUserUpdateDTO) {
    return this.userService.createUserUpdate(createUserUpdateDTO);
  }
  @Get('update')
  async getAllUpdates() {
    return this.userService.getAllUsersUpdates();
  }
  @Get('update/:id')
  async getAllUpdatesByUserId(@Param() params: any) {
    return this.userService.getUserUpdateById(params.id);
  }

  @Put('update')
  async updateUserUpdate(@Body() updateUserUpdateDTO: EditUserUpdateDTO) {
    return this.userService.updateUsetUpdates(updateUserUpdateDTO);
  }

  @Delete('update/:id')
  async deleteUpdateById(@Param() params: any) {
    return this.userService.deleteUserUpdate(params.id);
  }

  @Delete('update/all/:id')
  async deleteUpdateByUserId(@Param() params: any) {
    return this.userService.deleteUserUpdateByUserId(params.id);
  }
}
