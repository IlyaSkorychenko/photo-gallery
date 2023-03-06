import { Module } from '@nestjs/common';
import { ConfigConnectorModule } from '../config/config-connector.module';
import { CognitoService } from './cognito.service'

@Module({
  imports: [ConfigConnectorModule],
  providers: [CognitoService]
})
export class AwsConnectorModule {}
