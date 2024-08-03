import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [LoginController],
  providers: [LoginService, UserRepository],
  exports: [LoginService],
})
export class LoginModule {}
