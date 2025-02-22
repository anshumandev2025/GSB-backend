import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //user info controller
  @Get()
  async getAllUser(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('filter') filter: string,
    @Query('isSubscribed') isSubscribed: boolean,
  ) {
    return this.userService.getAllUser(
      page,
      limit,
      search,
      filter,
      isSubscribed,
    );
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
  async getAllStoryByUserId(
    @Param() params: any,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.userService.getAllStoryByUserId(params.id, page, limit);
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
  async getAllUpdates(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
  ) {
    return this.userService.getAllUsersUpdates(page, limit, search);
  }
  @Get('update/:id')
  async getAllUpdatesByUserId(
    @Param() params: any,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.userService.getUserUpdateById(params.id, page, limit);
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
