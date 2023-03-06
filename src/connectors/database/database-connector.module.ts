import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigConnectorModule } from 'src/connectors/config/config-connector.module';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigConnectorModule],
      inject: [ConfigConnectorService, ConfigService],
      useFactory: (configConnectorService: ConfigConnectorService) => {
        const dbConfig = configConnectorService.getDbConfig();

        return {
          type: 'postgres',
          host: dbConfig.DB_HOST,
          port: parseInt(dbConfig.DB_PORT),
          username: dbConfig.DB_USER,
          password: dbConfig.DB_PASSWORD,
          database: dbConfig.DB_NAME
        };
      }
    })
  ],
})
export class DatabaseConnectorModule {}
