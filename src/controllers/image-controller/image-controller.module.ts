import { Module } from '@nestjs/common';
import { ImageController } from 'src/controllers/image-controller/image.controller';
import { ImageModule } from 'src/modules/image/image.module';

@Module({
  imports: [ImageModule],
  controllers: [ImageController]
})
export class ImageControllerModule {}
