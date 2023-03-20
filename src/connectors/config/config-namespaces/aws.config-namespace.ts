import { AwsEnvDto } from 'src/connectors/config/dtos/aws-env.dto';
import { createConfigNamespace } from 'src/connectors/config/helpers/create-config-namespace';

export const AWS_APP_TOKEN = 'aws-config';

export default createConfigNamespace(AWS_APP_TOKEN, process.env, AwsEnvDto);
