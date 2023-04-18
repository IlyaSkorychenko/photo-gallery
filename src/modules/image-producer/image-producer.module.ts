import { Module } from '@nestjs/common';
import { AwsConnectorModule } from 'src/connectors/aws/aws-connector.module';
import { ConfigConnectorModule } from 'src/connectors/config/config-connector.module';
import { ImageProducerService } from 'src/modules/image-producer/image-producer.service';
import { ImageModule } from 'src/modules/image/image.module';

@Module({
  imports: [ImageModule, AwsConnectorModule, ConfigConnectorModule],
  providers: [ImageProducerService],
  exports: [ImageProducerService]
})
export class ImageProducerModule {}
