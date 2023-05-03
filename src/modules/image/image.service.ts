import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { imageSize } from 'image-size';
import { S3Service } from 'src/connectors/aws/s3.service';
import { CompressedImage } from 'src/modules/image/app-entities/compressed-image.app-entity';
import { Image } from 'src/modules/image/app-entities/image.app-entity';
import { ICreateParams } from 'src/modules/image/types/image-service-params.types';
import { CompressedImage as CompressedImageEntity } from 'src/repos/image-repo/entities/compressed-image.entity';
import { Image as ImageEntity } from 'src/repos/image-repo/entities/image.entity';
import { ImageRepoService } from 'src/repos/image-repo/image-repo.service';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepoService: ImageRepoService, private readonly s3Service: S3Service) {}

  public async create({ userId, name, format, description, bufferData }: ICreateParams): Promise<string> {
    const { width, height } = imageSize(bufferData);
    const existImage = await this.imageRepoService.fundByUniqueAttributes(userId, name, format);
    let duplicateNameId = 1;

    if (existImage) {
      duplicateNameId = existImage.duplicateNameId + 1;
    }

    const newImageId = await this.imageRepoService.createAndReturnId({
      userId,
      name,
      description,
      duplicateNameId,
      format,
      width,
      height
    });
    await this.s3Service.uploadFile(`${newImageId}.${format}`, bufferData);

    return newImageId;
  }

  private formatImageEntity(image: ImageEntity, compressedImages?: CompressedImage[]) {
    return plainToInstance(Image, {
      ...image,
      name:
        image.duplicateNameId === 1
          ? `${image.name}.${image.format}`
          : `${image.name}_${image.duplicateNameId}.${image.format}`,
      url: this.getImageUrl(image.id, image.format),
      compressedImages
    });
  }

  private formatCompressedImageEntity(compressedImage: CompressedImageEntity, format: string) {
    return plainToInstance(CompressedImage, {
      ...compressedImage,
      url: this.getImageUrl(compressedImage.id, format)
    });
  }

  public getImageUrl(id: string, format: string) {
    return this.s3Service.getFileUrl(`${id}.${format}`);
  }

  public async getAll(userId: string): Promise<Image[]> {
    const dbEntities = await this.imageRepoService.findAllParentsWithCompressedImagesByUserId(userId);

    return dbEntities.map((dbEntity) => {
      const compressedImages = dbEntity.compressedImages.map((compressedImage) =>
        this.formatCompressedImageEntity(compressedImage, dbEntity.format)
      );

      return this.formatImageEntity(dbEntity, compressedImages);
    });
  }
}
