import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';

export interface ICreateParams {
  userId: string;
  name: string;
  resolution: ResolutionEnum;
  format: string;
  description?: string;
  parentId?: string;
}
