import { Module } from '@nestjs/common';
import { AwsConnectorModule } from 'src/connectors/aws/aws-connector.module';
import { ConfigConnectorModule } from 'src/connectors/config/config-connector.module';
import { ImageConsumerService } from 'src/modules/image-consumer/image-consumer.service';
import { ImageRepoModule } from 'src/repos/image-repo/image-repo.module';

@Module({
  imports: [ConfigConnectorModule, AwsConnectorModule, ImageRepoModule],
  providers: [ImageConsumerService],
  exports: [ImageConsumerService]
})
export class ImageConsumerModule {}
