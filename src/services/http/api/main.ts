import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';
import { CONFIG_API_TOKEN } from 'src/connectors/config/config-namespaces/api.config-namespace';
import { CONFIG_APP_TOKEN } from 'src/connectors/config/config-namespaces/app.config-namespace';
import { ApiEnvDto } from 'src/connectors/config/dtos/api-env.dto';
import { AppEnvDto } from 'src/connectors/config/dtos/app-env.dto';
import { EnvironmentTypes } from 'src/connectors/config/types/environmentTypes';
import { generateValidationPipe } from 'src/globals/pipes/validation.pipes';
import { ApiServiceModule } from 'src/services/http/api/api-service.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiServiceModule);
  const config = app.get<ConfigConnectorService>(ConfigConnectorService);
  const { PORT, HOST, NODE_ENV } = config.getAppConfig();
  const { prefixes } = config.getApiConfig();

  app.setGlobalPrefix(prefixes.main);
  app.useGlobalPipes(generateValidationPipe(NODE_ENV === EnvironmentTypes.local));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(new Reflector())
    // new ValidateInterceptor()
  );

  await app.listen(PORT, HOST);
}

bootstrap();
