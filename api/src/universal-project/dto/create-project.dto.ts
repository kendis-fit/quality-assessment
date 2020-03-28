import { ApiProperty } from "@nestjs/swagger";

import { Profile } from "src/json/profile.enum";

export class CreateProject {
    @ApiProperty()
    public name: string;

    @ApiProperty({ enum: Profile })
    public typeProfile: Profile;

    public constructor({ name, typeProfile }: CreateProject) {
        this.name = name;
        this.typeProfile = typeProfile;
    }
}