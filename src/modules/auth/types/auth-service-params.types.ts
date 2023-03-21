export interface ISignInParams {
  email?: string;
  nickname: string;
  password: string;
  twoFactorCode?: string;
}

export interface ISignUpParams {
  nickname: string;
  email: string;
  name: string;
  password: string;
}

export interface IConfirmSignUpParams {
  nickname: string;
  code: string;
}

export interface IResendConfirmSignUpParams {
  nickname: string;
}

export interface IVerifyTwoFactorParams {
  accessToken: string;
  twoFactorCode: string;
}
