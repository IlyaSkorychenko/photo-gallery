import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignUpRequestValidatorDto {
  @IsString()
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*[a-z])/, {
    message:
      'Password must contain at least one number, one special character, one uppercase letter, and one lowercase letter'
  })
  password: string;
}
