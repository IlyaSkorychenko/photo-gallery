import { Module } from '@nestjs/common';
import { ImageGrpcController } from 'src/controllers/image-grpc-controller/image-grpc.controller';
import { ImageModule } from 'src/modules/image/image.module';

@Module({
  imports: [ImageModule],
  controllers: [ImageGrpcController]
})
export class ImageGrpcControllerModule {}
