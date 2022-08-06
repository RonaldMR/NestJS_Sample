import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../../auth/domain/token';

@Injectable()
export class JwtTokenManager {
  constructor(private jwtService: JwtService) {}

  async sign(payload: object): Promise<Token> {
    console.log(this.jwtService);
    const result = await this.jwtService.signAsync(payload);
    const token: Token = { accessToken: result };
    return token;
  }
}
