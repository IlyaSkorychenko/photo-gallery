import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CognitoService } from 'src/connectors/aws/cognito.service';
import { ConfirmSignUpRequestValidatorDto } from 'src/controllers/auth-controller/request-validator-dtos/confirm-sign-up.request-validator-dto';
import { ResendConfirmSignUpCodeRequestValidatorDto } from 'src/controllers/auth-controller/request-validator-dtos/resend-confirm-sign-up-code.request-validator-dto';
import { SignInRequestValidatorDto } from 'src/controllers/auth-controller/request-validator-dtos/sign-in.request-validator-dto';
import { SignUpRequestValidatorDto } from 'src/controllers/auth-controller/request-validator-dtos/sign-up.request-validator-dto';
import { GetUser } from 'src/controllers/common/decorators/get-user.decorator';
import { AuthService } from 'src/modules/auth/auth.service';
import { ICognitoAccessUser } from 'src/modules/auth/types/cognito-access-strategy.types';

@Controller('auth')
export class AuthController {
  constructor(private cognitoService: CognitoService, private authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() body: SignInRequestValidatorDto) {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  signUp(@Body() body: SignUpRequestValidatorDto) {
    return this.authService.signUp(body);
  }

  @Post('confirm-sign-up')
  confirmSignUp(@Body() body: ConfirmSignUpRequestValidatorDto) {
    return this.authService.confirmSignUp(body);
  }

  @Post('resend-confirmation-code')
  resendConfirmationCode(@Body() body: ResendConfirmSignUpCodeRequestValidatorDto) {
    return this.authService.resendConfirmSignUpCode(body);
  }

  @Post('activate-two-factor')
  @UseGuards(AuthGuard('cognito-access'))
  activateTwoFactor(@GetUser() user: ICognitoAccessUser) {
    return this.authService.activateTwoFactor(user.accessToken);
  }

  @Post('deactivate-two-factor')
  @UseGuards(AuthGuard('cognito-access'))
  deactivateTwoFactor(@GetUser() user: ICognitoAccessUser) {
    return this.authService.deactivateTwoFactor(user.accessToken);
  }

  @Post('verify-two-factor')
  @UseGuards(AuthGuard('cognito-access'))
  verifyTwoFactor(@GetUser() user: ICognitoAccessUser, @Body() body: { code: string }) {
    return this.authService.verifyTwoFactor(user.accessToken, body.code);
  }

  @Post('refresh-tokens')
  refreshTokens(@Body() body: { refreshToken: string }) {
    return this.authService.refreshTokens(body.refreshToken);
  }
}
