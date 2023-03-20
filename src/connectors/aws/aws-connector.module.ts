import { Module } from '@nestjs/common';
import { CognitoService } from 'src/connectors/aws/cognito.service';
import { ConfigConnectorModule } from 'src/connectors/config/config-connector.module';

@Module({
  imports: [ConfigConnectorModule],
  providers: [CognitoService],
  exports: [CognitoService]
})
export class AwsConnectorModule {}
