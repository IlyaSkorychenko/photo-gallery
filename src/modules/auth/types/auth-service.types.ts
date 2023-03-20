export interface ITokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expireIn: number;
}

export interface IRefreshedTokens {
  accessToken: string;
  idToken: string;
  expireIn: number;
}

export interface IUserData {
  nickname: string;
  email: string;
  name: string;
}

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
