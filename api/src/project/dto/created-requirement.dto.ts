import { ApiProperty } from "@nestjs/swagger";

import IIndex from "../interfaces/index.interface";

export class CreatedRequirement {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public profile: IIndex[];

	public constructor({ id }: CreatedRequirement) {
		this.id = id;
	}
}
