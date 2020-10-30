import { ApiProperty } from "@nestjs/swagger";

export class UserRegistration {
    @ApiProperty()
    public name: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public password: string;

    public constructor({ name, email, password }: UserRegistration) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}