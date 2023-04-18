import { plainToInstance } from 'class-transformer';
import { config } from 'dotenv';
import { DbEnvDto } from 'src/connectors/config/dtos/db-env.dto';
import { validateConfig } from 'src/connectors/config/helpers/validate-config.helper';
import { DataSource } from 'typeorm';

config();

const dbConfig = plainToInstance(DbEnvDto, process.env, { strategy: 'excludeAll' });
validateConfig(dbConfig);

export const connection = new DataSource({
  type: 'postgres',
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  host: dbConfig.DB_HOST,
  port: parseInt(dbConfig.DB_PORT),
  database: dbConfig.DB_NAME,
  migrations: ['src/connectors/database/migrations/*.ts'],
  entities: ['src/**/*.entity.ts']
});
