import { Module } from '@nestjs/common';
import { AwsConnectorModule } from 'src/connectors/aws/aws-connector.module';
import { AuthController } from 'src/controllers/auth-controller/auth.controller';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [AwsConnectorModule, AuthModule],
  controllers: [AuthController]
})
export class AuthControllerModule {}
