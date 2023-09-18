import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret, SigningKeyNotFoundError } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigConnectorService } from 'src/connectors/config/config-connector.service';
import { JsonObject } from 'src/types/json-object.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configConnectorService: ConfigConnectorService) {
    const { COGNITO_POOL_ID, COGNITO_REGION } = configConnectorService.getCognitoConfig();
    const authority = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_POOL_ID}`;

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authority}/.well-known/jwks.json`,
        handleSigningKeyError: (err, cb) => {
          if (err instanceof SigningKeyNotFoundError) {
            return cb(new Error('Invalid key'));
          }

          return cb(err);
        }
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: authority,
      algorithms: ['RS256']
    });
  }

  // TODO replace type
  public async validate(payload: JsonObject) {
    return payload;
  }
}
