import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';

import { IJwtPayload } from "./jwt.interface";
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UserService, private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.JwtSecretKey,
        });
    }

    public async validate(payload: IJwtPayload, done: VerifiedCallback): Promise<void> {
        const user = await this.usersService.getUserByEmail(payload.email);
        if (!user) {
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }
        return done(null, user, payload.iat);
    }
}