import { ValidationError } from '@nestjs/common';
import { validateSync } from 'class-validator';

export function validateConfig(obj: object) {
  const errors = validateSync(obj, {
    forbidNonWhitelisted: true
  });

  if (errors.length) {
    throw new Error(JSON.stringify(getErrorsConstraintsRecursive(errors), null, 2));
  }
}

function getErrorsConstraintsRecursive(errors: ValidationError[], constraints: Record<string, string>[] = []) {
  errors.forEach(error => {
    constraints.push(error.constraints);

    if (error.children) {
      getErrorsConstraintsRecursive(error.children, constraints);
    }
  });

  return constraints;
}