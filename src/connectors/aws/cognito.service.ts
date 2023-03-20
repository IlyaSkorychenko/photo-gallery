import {
  AssociateSoftwareTokenCommand,
  ChallengeNameType,
  CognitoIdentityProvider,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GetUserCommand,
  GetUserCommandOutput,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
  RespondToAuthChallengeCommand,
  SetUserMFAPreferenceCommand,
  SignUpCommand,
  VerifySoftwareTokenCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import { AuthenticationResultType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';

@Injectable()
export class CognitoService {
  private readonly client: CognitoIdentityProviderClient;
  private readonly clientId: string;

  constructor(private configConnectorService: ConfigConnectorService) {
    const { COGNITO_CLIENT_ID, COGNITO_REGION } = configConnectorService.getCognitoConfig();
    const { SECRET_ACCESS_KEY, ACCESS_KEY_ID } = configConnectorService.getAwsConfig();

    this.clientId = COGNITO_CLIENT_ID;
    this.client = new CognitoIdentityProvider({
      region: COGNITO_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
      }
    });
  }

  async registerUser(nickname: string, email: string, name: string, password: string): Promise<void> {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      Password: password,
      Username: nickname,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'nickname',
          Value: nickname
        },
        {
          Name: 'name',
          Value: name
        }
      ]
    });
    await this.client.send(command);
  }

  async confirmUserRegistration(nickname: string, confirmationCode: string): Promise<void> {
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      Username: nickname,
      ConfirmationCode: confirmationCode
    });
    await this.client.send(command);
  }

  async resendRegistrationConfirmCode(nickname: string): Promise<void> {
    const command = new ResendConfirmationCodeCommand({
      ClientId: this.clientId,
      Username: nickname
    });
    await this.client.send(command);
  }

  getUserByAuthToken(accessToken: string): Promise<GetUserCommandOutput> {
    const command = new GetUserCommand({
      AccessToken: accessToken
    });

    return this.client.send(command);
  }

  async setupMfa(accessToken: string): Promise<string> {
    const setupMfaCommand = new AssociateSoftwareTokenCommand({
      AccessToken: accessToken
    });
    const { SecretCode: secretCode } = await this.client.send(setupMfaCommand);

    return secretCode;
  }

  async verifyMfa(accessToken: string, mfaCode: string): Promise<void> {
    const setupMfaCommand = new VerifySoftwareTokenCommand({
      AccessToken: accessToken,
      UserCode: mfaCode
    });
    await this.client.send(setupMfaCommand);
    await this.changeMfaSettings(accessToken, true);
  }

  async changeMfaSettings(accessToken: string, mfaStatus: boolean): Promise<void> {
    const changeMfaSettingsCommand = new SetUserMFAPreferenceCommand({
      AccessToken: accessToken,
      SMSMfaSettings: {
        Enabled: false,
        PreferredMfa: false
      },
      SoftwareTokenMfaSettings: {
        Enabled: mfaStatus,
        PreferredMfa: mfaStatus
      }
    });

    await this.client.send(changeMfaSettingsCommand);
  }

  async authenticateByRefreshToken(refreshToken: string): Promise<AuthenticationResultType> {
    const command = new InitiateAuthCommand({
      ClientId: this.clientId,
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      AuthParameters: {
        REFRESH_TOKEN: refreshToken
      }
    });
    const result = await this.client.send(command);

    return result.AuthenticationResult;
  }

  async authenticateUser(
    emailOrNickname: string,
    password: string,
    mfaCode?: string
  ): Promise<AuthenticationResultType> {
    const authCommand = new InitiateAuthCommand({
      ClientId: this.clientId,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: emailOrNickname,
        PASSWORD: password
      }
    });
    const authResponse = await this.client.send(authCommand);

    if (!authResponse.ChallengeName) {
      return authResponse.AuthenticationResult;
    }

    switch (authResponse.ChallengeName) {
      case ChallengeNameType.SOFTWARE_TOKEN_MFA: {
        const mfaCommand = new RespondToAuthChallengeCommand({
          ClientId: this.clientId,
          ChallengeName: ChallengeNameType.SOFTWARE_TOKEN_MFA,
          ChallengeResponses: {
            SOFTWARE_TOKEN_MFA_CODE: mfaCode,
            USERNAME: emailOrNickname
          },
          Session: authResponse.Session
        });
        const mfaResult = await this.client.send(mfaCommand);

        return mfaResult.AuthenticationResult;
      }

      default: {
        throw new Error('Unsupported channel name');
      }
    }
  }
}
