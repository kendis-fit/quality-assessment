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

	@ApiProperty()
	public createdAt: Date;

	public constructor({ id, name, parentId, requirements, createdAt }: RequirementView) {
		this.id = id;
		this.name = name;
		this.parentId = parentId;
		this.createdAt = createdAt;
		this.requirements = requirements?.map(requirement => new RequirementView(requirement));
	}
}
