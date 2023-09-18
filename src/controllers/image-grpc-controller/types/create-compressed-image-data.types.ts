export enum NumericResolutionEnum {
  default,
  high,
  medium,
  low
}

export interface CreateCompressedImageData {
  originalId: string;
  type: NumericResolutionEnum;
}
