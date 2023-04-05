import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';
import apiConfigNamespace from 'src/connectors/config/config-namespaces/api.config-namespace';
import appConfigNamespace from 'src/connectors/config/config-namespaces/app.config-namespace';
import awsConfigNamespace from 'src/connectors/config/config-namespaces/aws.config-namespace';
import cognitoConfigNamespace from 'src/connectors/config/config-namespaces/cognito.config-namespace';
import dbConfigNamespace from 'src/connectors/config/config-namespaces/db.config-namespace';
import s3ConfigNamespace from 'src/connectors/config/config-namespaces/s3.config-namespace';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        appConfigNamespace,
        apiConfigNamespace,
        dbConfigNamespace,
        cognitoConfigNamespace,
        s3ConfigNamespace,
        awsConfigNamespace
      ]
    })
  ],
  providers: [ConfigConnectorService],
  exports: [ConfigConnectorService]
})
export class ConfigConnectorModule {}
