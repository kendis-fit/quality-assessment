import { ApiProperty } from "@nestjs/swagger";

import { StatusModificate } from "src/requirement/requirement.enum";

export class RequirementView {
	@ApiProperty()
	public id: number;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public requirements: RequirementView[];

	@ApiProperty()
	public statusModificate: StatusModificate;

	public constructor({
		id,
		name,
		requirements,
		statusModificate,
	}: RequirementView) {
		this.id = id;
		this.name = name;
		this.requirements = requirements;
		this.statusModificate = statusModificate;
	}
}
