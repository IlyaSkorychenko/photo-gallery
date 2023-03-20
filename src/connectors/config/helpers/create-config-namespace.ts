import { ConfigObject } from '@nestjs/config/dist/types';
import { registerAs } from '@nestjs/config/dist/utils/register-as.util';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateConfig } from 'src/connectors/config/helpers/validate-config.helper';
import { JsonObject } from 'src/types/json-object.types';

export function createConfigNamespace<T extends ConfigObject>(
  name: string,
  configData: JsonObject,
  classConstructor: ClassConstructor<T>
) {
  return registerAs(name, (): T => {
    const config = plainToClass(classConstructor, configData, { strategy: 'excludeAll' });
    validateConfig(config);

    return config;
  });
}
