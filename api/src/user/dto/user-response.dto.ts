import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
    @ApiProperty()
    public token: string;

    public constructor({ token }: UserResponse) {
        this.token = token;
    }
}