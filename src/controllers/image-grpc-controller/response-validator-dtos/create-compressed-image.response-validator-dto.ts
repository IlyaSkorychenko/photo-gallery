import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class CreateCompressedImage {
  @Expose()
  @IsUUID()
  id: string;
}
