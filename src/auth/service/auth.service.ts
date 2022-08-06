import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Token } from 'src/auth/domain/token';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { SignInPayload } from '../domain/user.signin-payload';
import { JwtTokenManager } from '../infrastructure/jwt.token-manager';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private tokenManager: JwtTokenManager,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { userName, password } = authCredentialsDto;

    const newUser: User = new User();
    newUser.userName = userName;
    newUser.password = password;

    await this.userRepository.create(newUser);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<Token> {
    const { userName, password } = authCredentialsDto;

    const user = await this.userRepository.getUser(userName, password);

    if (!user) {
      throw new UnauthorizedException('Login credentials are incorrect');
    }

    const payload: SignInPayload = { userName: userName };

    const token = await this.tokenManager.sign(payload);

    return token;
  }
}
