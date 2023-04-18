import { SqsEnvDto } from 'src/connectors/config/dtos/sqs-env.dto';
import { createConfigNamespace } from 'src/connectors/config/helpers/create-config-namespace';

export const CONFIG_SQS_TOKEN = 'sqs-config';

export default createConfigNamespace(CONFIG_SQS_TOKEN, process.env, SqsEnvDto);
