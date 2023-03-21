import { IsNumberString, IsString, Length } from 'class-validator';

export class VerifyTwoFactorRequestValidatorDto {
  @IsString()
  @IsNumberString()
  @Length(6, 6)
  twoFactorCode: string;
}
