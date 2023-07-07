import { GlobalService, TUser } from '@libs/libs';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

export const AUTH_GUARD_JWT = GlobalService.appName;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH_GUARD_JWT) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET,
    });
  }

  async validate(payload: TUser) {
    const { accessToken } = payload;

    const isValid = await this.authService.validateIdentityUser(accessToken);
    if (!isValid) {
      throw new Error('Token Expired !!!');
    }
    return payload;
  }
}
