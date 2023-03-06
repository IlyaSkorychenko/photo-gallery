import { HttpException, ValidationError, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

function shortExceptionFactory(errors: ValidationError[]) {
  return new HttpException(
    {
      errors: errors.map(({ value, property, constraints }) => ({
        value,
        property,
        constraints
      }))
    },
    400
  );
}

function fullExceptionFactory(validationError: ValidationError[]) {
  const errors = validationError.map((e) => ({
    value: e.value,
    property: e.property,
    constraints: e.constraints
  }));

  return new HttpException(
    {
      errors
    },
    400
  );
}

export function generateValidationPipe(printFullError = false, options: ValidationPipeOptions = {}) {
  const exceptionFactory = printFullError ? fullExceptionFactory : shortExceptionFactory;

  return new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory,
    ...options
  });
}
