import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthCredentialDto, UserDto } from './dto/auth-credential.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<UserDto> {
    return this.loginService.signUp(authCredentialDto);
  }

  @Post('/login')
  signIn(@Body() authCredentialDto: AuthCredentialDto) {
    return this.loginService.logIn(authCredentialDto);
  }
}
