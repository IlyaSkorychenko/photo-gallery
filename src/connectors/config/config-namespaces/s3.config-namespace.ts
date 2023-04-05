import { S3EnvDto } from 'src/connectors/config/dtos/s3-env.dto';
import { createConfigNamespace } from 'src/connectors/config/helpers/create-config-namespace';

export const CONFIG_S3_TOKEN = 's3-config';

export default createConfigNamespace(CONFIG_S3_TOKEN, process.env, S3EnvDto);
