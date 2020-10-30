import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';

import { IJwtPayload } from "./jwt.interface";
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.JwtSecretKey,
        });
    }

    public async validate(payload: IJwtPayload, done: VerifiedCallback): Promise<void> {
        if (!payload) {
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }
        return done(null, { id: payload.id, email: payload.email }, payload.iat);
    }
}