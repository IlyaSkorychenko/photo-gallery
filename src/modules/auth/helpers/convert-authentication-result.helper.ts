import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider/dist-types/models/models_0';
import { IRefreshedTokens, ITokens } from 'src/modules/auth/types/auth-service.types';

export function convertAuthenticationResul(authenticationResult: AuthenticationResultType): ITokens {
  return {
    accessToken: authenticationResult.AccessToken,
    refreshToken: authenticationResult.RefreshToken,
    idToken: authenticationResult.IdToken,
    expireIn: authenticationResult.ExpiresIn
  };
}

export function convertRefreshTokenResul(authenticationResult: AuthenticationResultType): IRefreshedTokens {
  return {
    accessToken: authenticationResult.AccessToken,
    idToken: authenticationResult.IdToken,
    expireIn: authenticationResult.ExpiresIn
  };
}
