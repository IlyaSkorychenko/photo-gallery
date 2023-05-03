import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class CreateResponseValidatorDto {
  @Expose()
  @IsUUID()
  id: string;
}
