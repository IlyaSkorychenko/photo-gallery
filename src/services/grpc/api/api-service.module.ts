import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseConnectorModule } from 'src/connectors/database/database-connector.module';
import { ImageGrpcControllerModule } from 'src/controllers/image-grpc-controller/image-grpc-controller.module';
import { CommonExceptionFilter } from 'src/services/http/common/exceptions-filters/common.exceptio-filter';

@Module({
  imports: [DatabaseConnectorModule, ImageGrpcControllerModule],
  providers: [
    {
      provide: APP_FILTER,
      useValue: CommonExceptionFilter
    }
  ]
})
export class ApiServiceModule {}
