import { Expose, Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { IUserData } from 'src/modules/auth/types/auth-service.types';
import { ICognitoAccessUser } from 'src/modules/auth/types/cognito-access-strategy.types';

class UserDataDto implements IUserData {
  email: string;
  name: string;
  nickname: string;
}

export class CognitoUserValidatorDto implements ICognitoAccessUser {
  @Expose()
  @IsString()
  accessToken: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => UserDataDto)
  data: UserDataDto;
}
