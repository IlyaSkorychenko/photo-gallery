import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';

export interface CreateImageRepoInterface {
  userId: string;
  name: string;
  resolution: ResolutionEnum;
  description?: string;
}
