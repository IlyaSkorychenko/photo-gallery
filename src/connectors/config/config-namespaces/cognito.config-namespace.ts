import { CognitoEnvDto } from 'src/connectors/config/dtos/cognito-env.dto';
import { createConfigNamespace } from 'src/connectors/config/helpers/create-config-namespace';

export const COGNITO_APP_TOKEN = 'cognito-config';

export default createConfigNamespace(COGNITO_APP_TOKEN, process.env, CognitoEnvDto);

