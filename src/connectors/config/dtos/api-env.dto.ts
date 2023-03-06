import { Expose, Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';

class PrefixesDto {
  @Expose()
  @IsString()
  main;
}

export class ApiEnvDto {
  @Expose()
  @IsObject()
  @ValidateNested()
  @Type(() => PrefixesDto)
  prefixes: PrefixesDto;
}
