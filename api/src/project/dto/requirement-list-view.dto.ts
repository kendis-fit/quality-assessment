import { ApiProperty } from "@nestjs/swagger";

export class RequirementListView {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	public constructor({ id, name }: RequirementListView) {
		this.id = id;
		this.name = name;
	}
}
