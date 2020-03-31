import { ApiProperty } from "@nestjs/swagger";

export class UserLogin {
    @ApiProperty()
    public email: string;

    @ApiProperty()
    public password: string;

    public constructor({ email, password }: UserLogin) {
        this.email = email;
        this.password = password;
    }
}