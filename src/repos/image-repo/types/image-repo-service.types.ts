import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';

export interface ICreateImageRepo {
  userId: string;
  name: string;
  format: string;
  duplicateNameId: number;
  width: number;
  height: number;
  description?: string;
}

export interface ICreateCompressImageRepo {
  imageId: string;
  resolution: ResolutionEnum;
}
