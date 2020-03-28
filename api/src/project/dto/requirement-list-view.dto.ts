import { ApiProperty } from "@nestjs/swagger";

import { StatusModificate } from "src/requirement/requirement.enum";

export class RequirementListView {
	@ApiProperty()
	public id: number;

	@ApiProperty()
	public name: string;

	@ApiProperty({ enum: StatusModificate })
	public statusModificate: StatusModificate;

	public constructor({ id, name, statusModificate }: RequirementListView) {
		this.id = id;
		this.name = name;
		this.statusModificate = statusModificate;
	}
}
