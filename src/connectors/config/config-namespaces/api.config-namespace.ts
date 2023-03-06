import { ApiEnvDto } from 'src/connectors/config/dtos/api-env.dto';
import { createConfigNamespace } from 'src/connectors/config/helpers/create-config-namespace';

export const CONFIG_API_TOKEN = 'api-config';

const apiConf = {
  prefixes: {
    main: 'api'
  }
};
const a = "some text";
export default createConfigNamespace(CONFIG_API_TOKEN, apiConf, ApiEnvDto);
