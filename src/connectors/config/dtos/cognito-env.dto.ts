import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CognitoEnvDto {
  @Expose()
  @IsString()
  COGNITO_POOL_ID: string;

  @Expose()
  @IsString()
  COGNITO_CLIENT_ID: string;

  // @Expose()
  // @IsString()
  // COGNITO_CLIENT_SECRET: string;

  @Expose()
  @IsString()
  COGNITO_REGION: string;
}
