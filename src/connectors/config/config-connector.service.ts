import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import apiConfigNamespace from 'src/connectors/config/config-namespaces/api.config-namespace';
import appConfigNamespace from 'src/connectors/config/config-namespaces/app.config-namespace';
import dbConfigNamespace from 'src/connectors/config/config-namespaces/db.config-namespace';
import cognitoConfigNamespace from './config-namespaces/cognito.config-namespace';

@Injectable()
export class ConfigConnectorService {
  constructor(
    @Inject(apiConfigNamespace.KEY)
    private apiConfig: ConfigType<typeof apiConfigNamespace>,

    @Inject(dbConfigNamespace.KEY)
    private dbConfig: ConfigType<typeof dbConfigNamespace>,

    @Inject(appConfigNamespace.KEY)
    private appConfig: ConfigType<typeof appConfigNamespace>,

    @Inject(cognitoConfigNamespace.KEY)
    private cognitoConfig: ConfigType<typeof cognitoConfigNamespace>
  ) {}

  getDbConfig() {
    return this.dbConfig;
  }

  getAppConfig() {
    return this.appConfig;
  }

  getApiConfig() {
    return this.apiConfig;
  }

  getCognitoConfig() {
    return this.cognitoConfig;
  }
}
