import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseConnectorModule } from 'src/connectors/database/database-connector.module';
import { AuthControllerModule } from 'src/controllers/auth-controller/auth-controller.module';
import { ImageControllerModule } from 'src/controllers/image-controller/image-controller.module';
import { CommonExceptionFilter } from 'src/services/http/common/exceptions-filters/common.exceptio-filter';

@Module({
  imports: [DatabaseConnectorModule, AuthControllerModule, ImageControllerModule],
  providers: [
    {
      provide: APP_FILTER,
      useValue: CommonExceptionFilter
    }
  ]
})
export class ApiServiceModule {}
