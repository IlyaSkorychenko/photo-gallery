import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AwsConnectorModule } from 'src/connectors/aws/aws-connector.module';
import { ConfigConnectorModule } from 'src/connectors/config/config-connector.module';
import { CognitoAccessStrategy } from 'src/modules/auth/strategies/cognito-access.strategy';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigConnectorModule, AwsConnectorModule, PassportModule],
  providers: [AuthService, CognitoAccessStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
