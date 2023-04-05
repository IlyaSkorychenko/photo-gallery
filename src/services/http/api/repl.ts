import { repl } from '@nestjs/core';
import { ApiServiceModule } from 'src/services/http/api/api-service.module';

async function bootstrap() {
  const replServer = await repl(ApiServiceModule);

  replServer.setupHistory('.nestjs_repl_history', (err) => {
    if (err) {
      console.error(err);
    }
  });
}

bootstrap();
