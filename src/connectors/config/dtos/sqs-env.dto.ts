import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class SqsEnvDto {
  @Expose()
  @IsString()
  SQS_URL: string;

  @Expose()
  @IsString()
  SQS_REGION: string;

  @Expose()
  @IsString()
  SQS_ACCESS_KEY_ID: string;

  @Expose()
  @IsString()
  SQS_SECRET_ACCESS_KEY: string;

  @Expose()
  @IsString()
  IMAGE_QUEUE_NAME: string;
}
