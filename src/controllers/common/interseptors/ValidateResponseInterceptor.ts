import { CallHandler, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { from, Observable, of, switchMap } from 'rxjs';

export class ValidateResponseInterceptor<T extends object> implements NestInterceptor {
  constructor(private dtoConstructor: ClassConstructor<T>) {}

  private async validate(response: unknown) {
    const responseDto = plainToInstance(this.dtoConstructor, response, {
      strategy: 'excludeAll'
    });

    await validateOrReject(responseDto, {
      whitelist: true,
      forbidNonWhitelisted: true
    });

    return responseDto;
  }

  intercept(_, next: CallHandler): Observable<unknown> | Promise<Observable<unknown>> {
    return next.handle().pipe(
      switchMap((response) => {
        if (typeof response !== 'object' || response === null) {
          return of(response);
        }

        if (response instanceof Array) {
          return from(Promise.all(response.map((r) => this.validate(r))));
        }

        return from(this.validate(response));
      })
    );
  }
}
