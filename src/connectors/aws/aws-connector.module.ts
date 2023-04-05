import { Module } from '@nestjs/common';
import { CognitoService } from 'src/connectors/aws/cognito.service';
import { S3Service } from 'src/connectors/aws/s3.service';
import { ConfigConnectorModule } from 'src/connectors/config/config-connector.module';

@Module({
  imports: [ConfigConnectorModule],
  providers: [CognitoService, S3Service],
  exports: [CognitoService, S3Service]
})
export class AwsConnectorModule {}
