import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { S3Service } from 'src/connectors/aws/s3.service';
import { Image } from 'src/modules/image/app-entities/image.app-entity';
import { ICreateParams } from 'src/modules/image/types/image-service-params.types';
import { Image as ImageEntity } from 'src/repos/image-repo/entities/image.entity';
import { ImageRepoService } from 'src/repos/image-repo/image-repo.service';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepoService: ImageRepoService, private readonly s3Service: S3Service) {}

  public async create({ userId, name, format, resolution, description, parentId }: ICreateParams): Promise<boolean> {
    const existImage = await this.imageRepoService.fundByUniqueAttributes(userId, name, format);
    let duplicateNameId = 1;

    if (existImage) {
      duplicateNameId = existImage.duplicateNameId + 1;
    }

    return this.imageRepoService.create({
      userId,
      name,
      resolution,
      description,
      parentId,
      duplicateNameId,
      format
    });
  }

  private formatImageEntity(image: ImageEntity, children?: Image[]) {
    return plainToInstance(Image, {
      ...image,
      name:
        image.duplicateNameId === 1
          ? `${image.name}.${image.format}`
          : `${image.name}_${image.duplicateNameId}.${image.format}`,
      url: this.s3Service.getFileUrl(`${image.id}.${image.format}`),
      children
    });
  }

  public async getAll(userId: string): Promise<Image[]> {
    const dbEntities = await this.imageRepoService.findAllParentsWithChildrenByUserId(userId);

    return dbEntities.map((dbEntity) => {
      const children = dbEntity.children.map((child) => this.formatImageEntity(child));

      return this.formatImageEntity(dbEntity, children);
    });
  }
}
