import { Expose } from 'class-transformer';
import { IsNumberString, IsString } from 'class-validator';

export class DbEnvDto {
  @Expose()
  @IsNumberString()
  DB_PORT: string;

  @Expose()
  @IsString()
  DB_NAME: string;

  @Expose()
  @IsString()
  DB_HOST: string;

  @Expose()
  @IsString()
  DB_USER: string;

  @Expose()
  @IsString()
  DB_PASSWORD: string;
}
