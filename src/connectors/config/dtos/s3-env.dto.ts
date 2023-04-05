import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class S3EnvDto {
  @Expose()
  @IsString()
  S3_REGION: string;

  @Expose()
  @IsString()
  S3_NAME: string;
}
