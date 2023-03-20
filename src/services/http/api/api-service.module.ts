import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigConnectorModule } from 'src/connectors/config/config-connector.module';
import { AuthControllerModule } from 'src/controllers/auth-controller/auth-controller.module';
import { CommonExceptionFilter } from 'src/services/http/common/exceptions-filters/common.exceptio-filter';

@Module({
  imports: [ConfigConnectorModule, AuthControllerModule],
  providers: [
    {
      provide: APP_FILTER,
      useValue: CommonExceptionFilter
    }
  ]
})
export class ApiServiceModule {}
