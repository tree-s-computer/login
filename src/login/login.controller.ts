import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('logins')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.loginService.signUp(authCredentialDto);
  }

  @Post('/login')
  logIn(@Body() authCredentialDto: AuthCredentialDto) {
    return this.loginService.logIn(authCredentialDto);
  }
}
