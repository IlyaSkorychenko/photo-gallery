import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Image } from 'src/repos/image-repo/entities/image.entity';
import { CreateImageRepoInterface } from 'src/repos/image-repo/types/create-image-repo.interface';
import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';
import { DataSource, EntityManager, IsNull } from 'typeorm';

@Injectable()
export class ImageRepoService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {}

  private getEntityManager(entityManager?: EntityManager) {
    return entityManager || this.dataSource.manager;
  }

  public fundByUniqueAttributes(
    userId: string,
    name: string,
    format: string,
    resolution = ResolutionEnum.full,
    entityManager?: EntityManager
  ): Promise<Image | null> {
    return this.getEntityManager(entityManager)
      .createQueryBuilder(Image, 'images')
      .where({
        userId,
        name,
        format,
        resolution
      })
      .orderBy('images.duplicateNameId', 'DESC')
      .getOne();
  }

  public findAllParentsWithChildrenByUserId(userId: string, entityManager?: EntityManager): Promise<Image[]> {
    return this.getEntityManager(entityManager)
      .createQueryBuilder(Image, 'images')
      .where({
        parentId: IsNull(),
        userId
      })
      .leftJoinAndSelect('images.children', 'children')
      .getMany();
  }

  public async create(imageData: CreateImageRepoInterface, entityManager?: EntityManager): Promise<boolean> {
    const { raw } = await this.getEntityManager(entityManager)
      .createQueryBuilder(Image, 'images')
      .insert()
      .values(imageData)
      .orIgnore(true)
      .execute();

    return Boolean(raw[0]);
  }
}
