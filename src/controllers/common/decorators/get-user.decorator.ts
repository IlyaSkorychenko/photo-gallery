import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CognitoUserValidatorDto } from 'src/controllers/common/validator-dtos/cognito-user.validator-dto';
import { JwtUserValidatorDto } from 'src/controllers/common/validator-dtos/jwt-user.validator-dto';
import { ICognitoAccessUser } from 'src/modules/auth/types/cognito-access-strategy.types';
import { IJwtUser } from 'src/modules/auth/types/jwt-strategy.types';

// for cognito-access strategy only
export const GetCognitoUser = createParamDecorator((_: unknown, context: ExecutionContext): ICognitoAccessUser => {
  const request = context.switchToHttp().getRequest();
  const userDto = plainToInstance(CognitoUserValidatorDto, request.user, {
    strategy: 'excludeAll'
  });
  const errors = validateSync(userDto, {
    forbidNonWhitelisted: true
  });

  if (errors.length) {
    throw new BadRequestException();
  }

  return userDto;
});

// for jwt strategy only
export const GetJwtUser = createParamDecorator((_: unknown, context: ExecutionContext): IJwtUser => {
  const request = context.switchToHttp().getRequest();
  const userDto = plainToInstance(JwtUserValidatorDto, request.user, {
    strategy: 'excludeAll'
  });
  const errors = validateSync(userDto, {
    forbidNonWhitelisted: true
  });

  if (errors.length) {
    throw new BadRequestException();
  }

  return userDto;
});
