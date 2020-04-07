import { ApiProperty } from "@nestjs/swagger";

import { Profile } from "src/json/profile.enum";

export class CreateProject {
	@ApiProperty()
	public name: string;

	@ApiProperty()
	public createdAt: string;

	@ApiProperty({ enum: Profile })
	public typeProfile: Profile;

	public constructor({ name, typeProfile, createdAt }: CreateProject) {
		this.name = name;
		this.typeProfile = typeProfile;
		this.createdAt = createdAt;
	}
}
