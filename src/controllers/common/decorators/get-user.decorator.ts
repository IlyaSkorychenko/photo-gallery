import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICognitoAccessUser } from 'src/modules/auth/types/cognito-access-strategy.types';

export const GetCognitoUser = createParamDecorator((_: unknown, context: ExecutionContext): ICognitoAccessUser => {
  const request = context.switchToHttp().getRequest();

  return request.user as ICognitoAccessUser;
});
