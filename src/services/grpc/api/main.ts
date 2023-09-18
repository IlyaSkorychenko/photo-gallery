import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ApiServiceModule } from 'src/services/grpc/api/api-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ApiServiceModule, {
    transport: Transport.GRPC,
    options: {
      package: 'photoGallery',
      protoPath: join(__dirname, '../protobuf/', 'photo-gallery.proto')
      // TODO
      // url: 'localhost:8080'
    }
  });
  // const config = app.get<ConfigConnectorService>(ConfigConnectorService);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  await app.listen();
}

bootstrap();
