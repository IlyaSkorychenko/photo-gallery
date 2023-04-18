import { Module } from '@nestjs/common';
import { DatabaseConnectorModule } from 'src/connectors/database/database-connector.module';
import { ImageConsumerModule } from 'src/modules/image-consumer/image-consumer.module';
import { ImageCompressorService } from 'src/services/image-compressor/image-compressor.service';

@Module({
  imports: [DatabaseConnectorModule, ImageConsumerModule],
  providers: [ImageCompressorService]
})
export class ImageCompressorModule {}
