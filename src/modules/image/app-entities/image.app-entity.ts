import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';

export class Image {
  id: string;
  name: string;
  url: string;
  resolution: ResolutionEnum;
  description?: string;
  updatedAt: Date;
  createdAt: Date;
}

export class ParentImage {
  children: Image[];
}
