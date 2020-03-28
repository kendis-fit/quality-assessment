import { ApiProperty } from "@nestjs/swagger";

import IIndex from "../interfaces/index.interface";

export class RequirementProfile {
	@ApiProperty({ type: () => [IIndex] })	
	public profile: IIndex[];

	public constructor({ profile }: RequirementProfile) {
		this.profile = profile;
	}
}
