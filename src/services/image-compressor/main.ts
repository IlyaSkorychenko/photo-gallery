import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ImageCompressorModule } from 'src/services/image-compressor/image-compressor.module';
import { ImageCompressorService } from 'src/services/image-compressor/image-compressor.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ImageCompressorModule);
  const imageCompressorService = app.get(ImageCompressorService);
  await imageCompressorService.run();
}

bootstrap();
