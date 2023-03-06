import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateImageRepoInterface } from 'src/repos/image-repo/types/create-image-repo.interface';
import { DataSource, EntityManager } from 'typeorm';
import { Image } from 'src/repos/image-repo/entities/image.entity';

@Injectable()
export class ImageRepoService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {}

  private getEntityManager(entityManager?: EntityManager) {
    return entityManager || this.dataSource.manager;
  }

  public findByUserId(userId: string, entityManager?: EntityManager): Promise<Image[]> {
    return this.getEntityManager(entityManager)
      .createQueryBuilder(Image, 'images')
      .where('images.user_id = :userId', {
        userId
      })
      .getMany();
  }

  public findById(imageId: string, entityManager?: EntityManager): Promise<Image> {
    return this.getEntityManager(entityManager)
      .createQueryBuilder(Image, 'images')
      .where('images.id = :imageId', {
        imageId
      })
      .getOne();
  }

  public async create(imageData: CreateImageRepoInterface, entityManager?: EntityManager): Promise<boolean> {
    const { raw } = await this.getEntityManager(entityManager)
      .createQueryBuilder(Image, 'images')
      .insert()
      .values(imageData)
      .orIgnore(true)
      .execute();

    return Boolean(raw);
  }
}
