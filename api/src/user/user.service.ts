import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { User } from './user.entity';
import { USER_REPOSITORY } from './user.providers';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class UserService {
    private readonly jwtSecretKey: string;

    public constructor(@Inject(USER_REPOSITORY)private users: typeof User, private configService: ConfigService) {
        this.jwtSecretKey = configService.JwtSecretKey;
    }

    public login() {

    }

    public registration() {

    }

    public async getUserByEmail(email: string): Promise<User> {
        const user = await this.users.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        return user;
    }
}
