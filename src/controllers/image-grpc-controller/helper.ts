import { NumericResolutionEnum } from 'src/controllers/image-grpc-controller/types/create-compressed-image-data.types';
import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';

export function convertNumericResolutionEnum(numericResolution: NumericResolutionEnum): ResolutionEnum {
  const map: Record<NumericResolutionEnum, ResolutionEnum> = {
    [NumericResolutionEnum.default]: null,
    [NumericResolutionEnum.low]: ResolutionEnum.low,
    [NumericResolutionEnum.medium]: ResolutionEnum.medium,
    [NumericResolutionEnum.high]: ResolutionEnum.high
  };

  return map[numericResolution];
}
