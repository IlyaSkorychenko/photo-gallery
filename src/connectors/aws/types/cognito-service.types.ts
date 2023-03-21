export interface IAuthenticationResult {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expireIn: number;
}

export interface IUserAttributesMap {
  name: string;
  email: string;
  nickname: string;
  subscription: string;
  isEmailVerified: boolean;
}

export interface IRawUserAttributesMap {
  name: string;
  email: string;
  nickname: string;
  sub: string;
  email_verified: string;
}

export interface IRefreshedAuthenticationResult {
  accessToken: string;
  idToken: string;
  expireIn: number;
}
