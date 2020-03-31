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
        try
        {
            const user = await this.usersService.getUserByEmail(payload.email);
            return done(null, user, payload.iat);
        }
        catch {
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }
    }
}