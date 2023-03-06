import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user-controller/user.controller';

@Module({
  controllers: [UserController]
})
export class UserControllerModule {}
