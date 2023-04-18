import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';

class CompressedImagesDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsEnum(ResolutionEnum)
  resolution: ResolutionEnum;

  @Expose()
  @IsString()
  url: string;
}

export class GetAllResponseValidatorDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  url: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CompressedImagesDto)
  compressedImages: CompressedImagesDto[];
}
