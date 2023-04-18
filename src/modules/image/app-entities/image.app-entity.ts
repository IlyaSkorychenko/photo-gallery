import { CompressedImage } from 'src/modules/image/app-entities/compressed-image.app-entity';

export class Image {
  id: string;
  name: string;
  url: string;
  format: string;
  description?: string;
  updatedAt: Date;
  createdAt: Date;
  compressedImages?: CompressedImage[];
}
