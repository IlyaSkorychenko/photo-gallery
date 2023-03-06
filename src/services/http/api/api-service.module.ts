import { Module } from '@nestjs/common';
import { ConfigConnectorModule } from 'src/connectors/config/config-connector.module';

@Module({
  imports: [ConfigConnectorModule]
})
export class ApiServiceModule {}
