import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import apiConfigNamespace from 'src/connectors/config/config-namespaces/api.config-namespace';
import appConfigNamespace from 'src/connectors/config/config-namespaces/app.config-namespace';
import awsConfigNamespace from 'src/connectors/config/config-namespaces/aws.config-namespace';
import cognitoConfigNamespace from 'src/connectors/config/config-namespaces/cognito.config-namespace';
import dbConfigNamespace from 'src/connectors/config/config-namespaces/db.config-namespace';
import { ApiEnvDto } from 'src/connectors/config/dtos/api-env.dto';
import { AppEnvDto } from 'src/connectors/config/dtos/app-env.dto';
import { AwsEnvDto } from 'src/connectors/config/dtos/aws-env.dto';
import { CognitoEnvDto } from 'src/connectors/config/dtos/cognito-env.dto';
import { DbEnvDto } from 'src/connectors/config/dtos/db-env.dto';

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
    private cognitoConfig: ConfigType<typeof cognitoConfigNamespace>,
    @Inject(awsConfigNamespace.KEY)
    private awsConfig: ConfigType<typeof awsConfigNamespace>
  ) {}

  getDbConfig(): DbEnvDto {
    return this.dbConfig;
  }

  getAppConfig(): AppEnvDto {
    return this.appConfig;
  }

  getApiConfig(): ApiEnvDto {
    return this.apiConfig;
  }

  getCognitoConfig(): CognitoEnvDto {
    return this.cognitoConfig;
  }

  getAwsConfig(): AwsEnvDto {
    return this.awsConfig;
  }
}
