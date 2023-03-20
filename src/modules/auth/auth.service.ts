import { CognitoIdentityServiceException } from '@aws-sdk/client-cognito-identity/dist-types/models/CognitoIdentityServiceException';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CognitoService } from 'src/connectors/aws/cognito.service';
import {
  convertAuthenticationResul,
  convertRefreshTokenResul
} from 'src/modules/auth/helpers/convert-authentication-result.helper';
import {
  IConfirmSignUpParams,
  IRefreshedTokens,
  IResendConfirmSignUpParams,
  ISignInParams,
  ISignUpParams,
  ITokens,
  IUserData
} from 'src/modules/auth/types/auth-service.types';

@Injectable()
export class AuthService {
  constructor(private cognitoService: CognitoService) {}

  public async signIn({ nickname, password, email, twoFactorCode }: ISignInParams): Promise<ITokens> {
    try {
      const authenticationResult = await this.cognitoService.authenticateUser(
        email || nickname,
        password,
        twoFactorCode
      );

      return convertAuthenticationResul(authenticationResult);
    } catch (e) {
      if ((e as CognitoIdentityServiceException).name === 'InvalidParameterException') {
        throw new BadRequestException('Two factor code is required for this user');
      }

      throw new BadRequestException();
    }
  }

  public async signUp({ nickname, email, name, password }: ISignUpParams) {
    try {
      await this.cognitoService.registerUser(nickname, email, name, password);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  public async confirmSignUp({ nickname, code }: IConfirmSignUpParams) {
    try {
      await this.cognitoService.confirmUserRegistration(nickname, code);
    } catch (e) {
      if ((e as CognitoIdentityServiceException).name === 'ExpiredCodeException') {
        throw new BadRequestException('Wrong confirmation code');
      }

      throw new BadRequestException();
    }
  }

  public async resendConfirmSignUpCode({ nickname }: IResendConfirmSignUpParams) {
    try {
      await this.cognitoService.resendRegistrationConfirmCode(nickname);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  public async getUserDataByAuthToken(accessToken: string): Promise<IUserData | null> {
    try {
      const rawUserData = await this.cognitoService.getUserByAuthToken(accessToken);

      return rawUserData as unknown as IUserData;
    } catch (e) {
      return null;
    }
  }

  public async activateTwoFactor(accessToken: string): Promise<string> {
    try {
      return await this.cognitoService.setupMfa(accessToken);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  public async deactivateTwoFactor(accessToken: string): Promise<void> {
    try {
      await this.cognitoService.changeMfaSettings(accessToken, false);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  public async verifyTwoFactor(accessToken: string, twoFactorCode: string) {
    try {
      await this.cognitoService.verifyMfa(accessToken, twoFactorCode);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  public async refreshTokens(refreshToken: string): Promise<IRefreshedTokens> {
    try {
      const authData = await this.cognitoService.authenticateByRefreshToken(refreshToken);

      return convertRefreshTokenResul(authData);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
