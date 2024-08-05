import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { compare } from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
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
