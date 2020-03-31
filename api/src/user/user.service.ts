import { sign } from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcrypt';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { User } from './user.entity';
import { UserLogin } from './dto/user-login.dto';
import { USER_REPOSITORY } from './user.providers';
import { ConfigService } from 'src/config/config.service';
import { UserRegistration } from './dto/user-registration';
import { UserResponse } from './dto/user-response.dto';

@Injectable()
export class UserService {
    private readonly jwtSecretKey: string;

    public constructor(@Inject(USER_REPOSITORY)private users: typeof User, private configService: ConfigService) {
        this.jwtSecretKey = configService.JwtSecretKey;
    }

    public async login(userLogin: UserLogin): Promise<UserResponse> {
        const email = userLogin.email;
        const password = userLogin.password;

        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }

        const token = sign({ email: user.email }, this.jwtSecretKey);
        return new UserResponse({ token });
    }

    public async registration(user: UserRegistration): Promise<UserResponse> {

    }

    public async getUserByEmail(email: string): Promise<User> {
        return await this.users.findOne({
            where: {
                email
            },
            include: [{ all: true }]
        });
    }
}
