import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AwsConnectorModule } from 'src/connectors/aws/aws-connector.module';
import { CognitoAccessStrategy } from 'src/modules/auth/strategies/cognito-access.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [AwsConnectorModule, PassportModule],
  providers: [AuthService, CognitoAccessStrategy],
  exports: [AuthService]
})
export class AuthModule {}
