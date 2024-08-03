import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserRepository } from './user.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, UserRepository])],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
