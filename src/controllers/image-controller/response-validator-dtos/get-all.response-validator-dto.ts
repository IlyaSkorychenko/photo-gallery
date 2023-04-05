import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUrl, IsUUID, ValidateNested } from 'class-validator';
import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';

class ImageResponseValidatorDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(ResolutionEnum)
  resolution: ResolutionEnum;

  @Expose()
  @IsUrl()
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
}

export class GetAllResponseValidatorDto extends ImageResponseValidatorDto {
  @Expose()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageResponseValidatorDto)
  children: ImageResponseValidatorDto[];
}
