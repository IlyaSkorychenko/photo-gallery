import { IsString } from 'class-validator';

export class ResendConfirmSignUpCodeRequestValidatorDto {
  @IsString()
  nickname: string;
}
