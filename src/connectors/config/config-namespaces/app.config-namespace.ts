import { createConfigNamespace } from 'src/connectors/config/helpers/create-config-namespace';
import { AppEnvDto } from 'src/connectors/config/dtos/app-env.dto';

export const CONFIG_APP_TOKEN = 'app-config';

export default createConfigNamespace(CONFIG_APP_TOKEN, process.env, AppEnvDto);
