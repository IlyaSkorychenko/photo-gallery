import { IsEmail, IsNumberString, IsOptional, IsString, Length, ValidateIf } from 'class-validator';

export class SignInRequestValidatorDto {
  @ValidateIf((o) => Boolean(o.email))
  @IsString()
  nickname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsNumberString()
  @Length(6, 6)
  twoFactorCode: string;
}
