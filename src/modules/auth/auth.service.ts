import { Injectable } from '@nestjs/common';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, ICognitoUserData } from 'amazon-cognito-identity-js';
import { ConfigConnectorService } from '../../connectors/config/config-connector.service';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(private configConnectorService: ConfigConnectorService) {
    const { COGNITO_CLIENT_ID, COGNITO_POOL_ID } = configConnectorService.getCognitoConfig();
    this.userPool = new CognitoUserPool({
      UserPoolId: COGNITO_CLIENT_ID,
      ClientId: COGNITO_POOL_ID
    });
  }

  authenticateUser(username: string, password: string) {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData: ICognitoUserData = {
      Username: username,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          resolve(result);
        },
        onFailure: err => {
          reject(err);
        },
      });
    });
  }
}
