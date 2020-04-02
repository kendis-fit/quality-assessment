import { ApiProperty } from "@nestjs/swagger";

export class RequirementView {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public parentId!: string;

	@ApiProperty()
	public requirements: RequirementView[];

	public constructor({ id, name, parentId, requirements }: RequirementView) {
		this.id = id;
		this.name = name;
		this.parentId = parentId;
		this.requirements = requirements;
	}
}
