import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CompressedImage } from 'src/repos/image-repo/entities/compressed-image.entity';
import { Image } from 'src/repos/image-repo/entities/image.entity';
import { ICreateCompressImageRepo, ICreateImageRepo } from 'src/repos/image-repo/types/image-repo-service.types';
import { DataSource, EntityManager } from 'typeorm';

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
    entityManager?: EntityManager
  ): Promise<Image | null> {
    return this.getEntityManager(entityManager)
      .createQueryBuilder(Image, 'images')
      .where({
        userId,
        name,
        format
      })
      .orderBy('images.duplicateNameId', 'DESC')
      .getOne();
  }

  public findAllParentsWithCompressedImagesByUserId(userId: string, entityManager?: EntityManager): Promise<Image[]> {
    return this.getEntityManager(entityManager)
      .createQueryBuilder(Image, 'images')
      .where({
        userId
      })
      .leftJoinAndSelect('images.compressedImages', 'compressedImages')
      .getMany();
  }

  public async create(imageData: ICreateImageRepo, entityManager?: EntityManager): Promise<Image | null> {
    const { raw }: { raw: Image[] } = await this.getEntityManager(entityManager)
      .createQueryBuilder(Image, 'images')
      .insert()
      .values(imageData)
      .orIgnore(true)
      .returning('*')
      .execute();

    return raw[0] || null;
  }

  public findById(id: string, entityManager?: EntityManager): Promise<Image | null> {
    return this.getEntityManager(entityManager)
      .createQueryBuilder(Image, 'images')
      .where({
        id
      })
      .getOne();
  }

  public async createCompressedImage(
    compressedImageData: ICreateCompressImageRepo,
    entityManager?: EntityManager
  ): Promise<CompressedImage | null> {
    const { raw }: { raw: CompressedImage[] } = await this.getEntityManager(entityManager)
      .createQueryBuilder(CompressedImage, 'compressedImages')
      .insert()
      .values(compressedImageData)
      .orIgnore(true)
      .returning('*')
      .execute();

    return raw[0] || null;
  }
}
