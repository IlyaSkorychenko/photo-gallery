import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompressedImage } from 'src/repos/image-repo/entities/compressed-image.entity';
import { Image } from 'src/repos/image-repo/entities/image.entity';
import { ImageRepoService } from 'src/repos/image-repo/image-repo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, CompressedImage])],
  providers: [ImageRepoService],
  exports: [ImageRepoService]
})
export class ImageRepoModule {}
