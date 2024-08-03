import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/login/user.entity';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
