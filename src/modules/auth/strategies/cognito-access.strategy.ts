import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { AuthService } from 'src/modules/auth/auth.service';
import { IUserData } from 'src/modules/auth/types/auth-service.types';
import { ICognitoAccessUser } from 'src/modules/auth/types/cognito-access-strategy.types';

@Injectable()
export class CognitoAccessStrategy extends PassportStrategy(Strategy, 'cognito-access') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<ICognitoAccessUser> {
    const authHeader = req.headers['authorization'] as string;
    this.validateAuthHeadersOrReject(authHeader);
    const [type, accessToken] = authHeader.split(' ');
    this.validateTypeOrReject(type);
    const data = await this.authService.getUserDataByAuthToken(accessToken);
    await this.validateUserOrReject(data);

    return { data, accessToken };
  }

  validateTypeOrReject(type: string): void {
    if (type !== 'Bearer') {
      throw new BadRequestException();
    }
  }

  validateAuthHeadersOrReject(type: string | undefined): void {
    if (!type) {
      throw new BadRequestException();
    }
  }

  validateUserOrReject(user: IUserData): void {
    if (!user) {
      throw new UnauthorizedException();
    }
  }
}
