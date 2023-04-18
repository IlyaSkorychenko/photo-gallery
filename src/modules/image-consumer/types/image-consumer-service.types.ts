import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';

export interface IUploadResizedImageParams {
  originalId: string;
  format: string;
  originalWidth: number;
  originalHeight: number;
  resolution: ResolutionEnum;
}
