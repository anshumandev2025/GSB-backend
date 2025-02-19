import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserUpdate, UserUpdateSchema } from './schema/userUpdate.schema';
import { UserStory, UserStorySchema } from './schema/userStory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserUpdate.name, schema: UserUpdateSchema },
      { name: UserStory.name, schema: UserStorySchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
