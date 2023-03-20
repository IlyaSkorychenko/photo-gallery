import { IUserData } from 'src/modules/auth/types/auth-service.types';

export interface ICognitoAccessUser {
  data: IUserData;
  accessToken: string;
}
