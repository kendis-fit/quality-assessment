import { ApiProperty } from "@nestjs/swagger";
import IIndex from "src/requirement/interfaces/index.interface";

export class ProjectView {
	@ApiProperty({ type: [IIndex] })
	public profile: IIndex[];

	public constructor({ profile }: ProjectView) {
		this.profile = profile;
	}
}
