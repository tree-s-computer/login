import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserDto } from './dto/auth-credential.dto';
import { compare, hash, genSalt } from 'bcrypt';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<UserDto> {
    const { email, password } = authCredentialDto;

    const user = new User();
    user.email = email;

    const salt = await genSalt();
    user.password = await hash(password, salt);
    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
    };
  }

  async logIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ message: string }> {
    const { email, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await compare(password, user.password))) {
      return { message: 'Login successful' };
    } else {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }
}
