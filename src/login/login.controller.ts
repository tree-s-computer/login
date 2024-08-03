import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signup')
  async signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.loginService.signUp(authCredentialDto);
  }
}
