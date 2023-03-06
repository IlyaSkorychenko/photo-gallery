import { Expose } from 'class-transformer';
import { IsEnum, IsNumberString, IsString } from 'class-validator';
import { EnvironmentTypes } from 'src/connectors/config/types/environmentTypes';

export class AppEnvDto {
  @Expose()
  @IsNumberString()
  PORT: string;

  @Expose()
  @IsString()
  HOST: string;

  @Expose()
  @IsEnum(EnvironmentTypes)
  NODE_ENV: EnvironmentTypes;
}
