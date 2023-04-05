import { Module } from '@nestjs/common';
import { AwsConnectorModule } from 'src/connectors/aws/aws-connector.module';
import { ImageService } from 'src/modules/image/image.service';
import { ImageRepoModule } from 'src/repos/image-repo/image-repo.module';

@Module({
  imports: [ImageRepoModule, AwsConnectorModule],
  providers: [ImageService],
  exports: [ImageService]
})
export class ImageModule {}
