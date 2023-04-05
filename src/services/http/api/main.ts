import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';
import { EnvironmentTypes } from 'src/connectors/config/types/environmentTypes';
import { ApiServiceModule } from 'src/services/http/api/api-service.module';
import { generateValidationPipe } from 'src/services/http/common/pipes/validation.pipes';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiServiceModule);
  const config = app.get<ConfigConnectorService>(ConfigConnectorService);
  const { PORT, HOST, NODE_ENV } = config.getAppConfig();
  const { prefixes } = config.getApiConfig();

  app.setGlobalPrefix(prefixes.main);
  app.useGlobalPipes(generateValidationPipe(NODE_ENV === EnvironmentTypes.local));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  await app.listen(PORT, HOST);
}

bootstrap();
