import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';
import apiConfigNamespace from 'src/connectors/config/config-namespaces/api.config-namespace';
import appConfigNamespace from 'src/connectors/config/config-namespaces/app.config-namespace';
import dbConfigNamespace from 'src/connectors/config/config-namespaces/db.config-namespace';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfigNamespace, apiConfigNamespace, dbConfigNamespace]
    })
  ],
  providers: [ConfigConnectorService],
  exports: [ConfigConnectorService]
})
export class ConfigConnectorModule {
}
