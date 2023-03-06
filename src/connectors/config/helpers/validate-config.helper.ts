import { validateSync } from 'class-validator';
import { JsonObject } from 'src/globals/types/json-object.types';

export function validateConfig(obj: JsonObject) {
  const errors = validateSync(obj, {
    forbidNonWhitelisted: true
  });

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors[0]?.constraints, null, 2));
  }
}
