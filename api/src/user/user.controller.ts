import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserLogin } from './dto/user-login.dto';
import { UserRegistration } from './dto/user-registration';
import { UserResponse } from './dto/user-response.dto';

@ApiTags("users")
@Controller("users")
export class UserController {
    public constructor(private userService: UserService) {}

    @ApiOkResponse()
    @Post("registration")
    public async registration(@Body()user: UserRegistration): Promise<UserResponse> {
        return await this.userService.registration(user);
    }

    @ApiOkResponse()
    @Post("login")
    public async login(@Body()user: UserLogin): Promise<UserResponse> {
        return await this.userService.login(user);
    }
}
