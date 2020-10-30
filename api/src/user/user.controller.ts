import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBody } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserLogin } from './dto/user-login.dto';
import { UserResponse } from './dto/user-response.dto';
import { UserRegistration } from './dto/user-registration';

@ApiTags("users")
@Controller("users")
export class UserController {
    public constructor(private userService: UserService) {}

    @ApiBody({ type: UserRegistration })
    @ApiOkResponse({ type: UserResponse })
    @Post("registration")
    public async registration(@Body()user: UserRegistration): Promise<UserResponse> {
        return await this.userService.registration(user);
    }

    @ApiBody({ type: UserLogin })
    @ApiOkResponse({ type: UserResponse })
    @Post("login")
    public async login(@Body()user: UserLogin): Promise<UserResponse> {
        return await this.userService.login(user);
    }
}
