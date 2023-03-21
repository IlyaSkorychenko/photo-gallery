import { IsString } from 'class-validator';

export class RefreshTokensRequestValidatorDto {
  @IsString()
  refreshToken: string;
}
