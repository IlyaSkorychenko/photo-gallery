import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { IJwtUser } from 'src/modules/auth/types/jwt-strategy.types';

export class JwtUserValidatorDto implements IJwtUser {
  @Expose()
  @IsUUID()
  sub: string;

  @Expose()
  @IsString()
  username: string;
}
