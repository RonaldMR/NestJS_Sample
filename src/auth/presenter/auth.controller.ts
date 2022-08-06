import { Body, Controller, Post } from '@nestjs/common';
import { Token } from 'src/auth/domain/token';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async singUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async singIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<Token> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
