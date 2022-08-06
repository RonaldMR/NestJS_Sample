import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './presenter/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserRepository } from './infrastructure/user.repository';
import { IUserRepository } from './domain/user.repository';
import { HashManager } from 'src/shared/infrastructure/hash-generator';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenManager } from './infrastructure/jwt.token-manager';
import { JwtStrategy } from './infrastructure/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    HashManager,
    JwtTokenManager,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
