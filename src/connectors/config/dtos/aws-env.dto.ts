import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AwsEnvDto {
  @Expose()
  @IsString()
  ACCESS_KEY_ID: string;

  @Expose()
  @IsString()
  SECRET_ACCESS_KEY: string;
}
