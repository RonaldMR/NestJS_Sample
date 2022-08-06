import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../domain/user.entity';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
