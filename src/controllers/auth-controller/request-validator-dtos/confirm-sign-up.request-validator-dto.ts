import { IsNumberString, IsString, Length } from 'class-validator';

export class ConfirmSignUpRequestValidatorDto {
  @IsString()
  nickname: string;

  @IsNumberString()
  @Length(6, 6)
  code: string;
}
