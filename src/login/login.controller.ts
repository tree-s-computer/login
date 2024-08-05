import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<User> {
    return this.loginService.signUp(authCredentialDto);
  }

  @Post('/login')
  signIn(@Body() authCredentialDto: AuthCredentialDto) {
    return this.loginService.logIn(authCredentialDto);
  }
}
