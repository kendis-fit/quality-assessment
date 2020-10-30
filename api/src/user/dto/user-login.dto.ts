import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class UserLogin {
    @ApiProperty()
    @IsString()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @IsString()
    public password: string;

    public constructor({ email, password }: UserLogin) {
        this.email = email;
        this.password = password;
    }
}