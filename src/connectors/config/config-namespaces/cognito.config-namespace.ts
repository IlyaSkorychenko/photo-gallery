import { CognitoEnvDto } from 'src/connectors/config/dtos/cognito-env.dto';
import { createConfigNamespace } from 'src/connectors/config/helpers/create-config-namespace';

export const CONFIG_COGNITO_TOKEN = 'cognito-config';

export default createConfigNamespace(CONFIG_COGNITO_TOKEN, process.env, CognitoEnvDto);
