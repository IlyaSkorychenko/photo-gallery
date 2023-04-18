import { Module } from '@nestjs/common';
import { ImageController } from 'src/controllers/image-controller/image.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ImageProducerModule } from 'src/modules/image-producer/image-producer.module';
import { ImageModule } from 'src/modules/image/image.module';

@Module({
  imports: [ImageModule, ImageProducerModule, AuthModule],
  controllers: [ImageController]
})
export class ImageControllerModule {}
