import { ApiProperty } from "@nestjs/swagger";

export class RequirementListView {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public createdAt: string;

	public constructor(id: string, name: string, createdAt: Date) {
		this.id = id;
		this.name = name;
		this.createdAt = createdAt.toISOString();
	}
}
