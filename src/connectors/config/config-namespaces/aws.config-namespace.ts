import { AwsEnvDto } from 'src/connectors/config/dtos/aws-env.dto';
import { createConfigNamespace } from 'src/connectors/config/helpers/create-config-namespace';

export const CONFIG_AWS_TOKEN = 'aws-config';

export default createConfigNamespace(CONFIG_AWS_TOKEN, process.env, AwsEnvDto);
