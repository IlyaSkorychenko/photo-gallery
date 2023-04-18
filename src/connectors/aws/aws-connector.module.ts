import { Module } from '@nestjs/common';
import { CognitoService } from 'src/connectors/aws/cognito.service';
import { S3Service } from 'src/connectors/aws/s3.service';
import { SqsService } from 'src/connectors/aws/sqs.service';
import { ConfigConnectorModule } from 'src/connectors/config/config-connector.module';

@Module({
  imports: [ConfigConnectorModule],
  providers: [CognitoService, S3Service, SqsService],
  exports: [CognitoService, S3Service, SqsService]
})
export class AwsConnectorModule {}
