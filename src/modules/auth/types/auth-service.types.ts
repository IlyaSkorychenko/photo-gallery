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
