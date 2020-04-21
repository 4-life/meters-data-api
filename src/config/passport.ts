import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { Request } from 'express';
import * as passport from 'passport';
import { UserService } from '../services/user';
import { User } from '../model/user';

export class PassportConfig {
  private userService = new UserService();

  constructor(passport: passport.PassportStatic) {
    const params: StrategyOptions = {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      passReqToCallback: true
    };

    const strategy = new Strategy(params, (req: Request, payload: any, done: VerifiedCallback) => {
      this.userService.findById(payload.id, (err: string, user: User) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });

    passport.use(strategy);
  }
}
