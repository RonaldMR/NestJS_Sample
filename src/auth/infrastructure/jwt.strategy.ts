import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository';
import { SignInPayload } from '../domain/user.signin-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: IUserRepository) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: SignInPayload): Promise<User> {
    const { userName } = payload;

    const user: User = await this.userRepository.getUser(userName);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
