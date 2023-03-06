import { DbEnvDto } from 'src/connectors/config/dtos/db-env.dto';
import { createConfigNamespace } from 'src/connectors/config/helpers/create-config-namespace';

export const CONFIG_DB_TOKEN = 'db-config';

export default createConfigNamespace(CONFIG_DB_TOKEN, process.env, DbEnvDto);
