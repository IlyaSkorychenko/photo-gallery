import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/repos/image-repo/entities/image.entity';
import { ImageRepoService } from 'src/repos/image-repo/image-repo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageRepoService],
  exports: [ImageRepoService]
})
export class ImageRepoModule {}
