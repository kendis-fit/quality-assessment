import { ApiProperty } from "@nestjs/swagger";

export class CreateRequirement {
	@ApiProperty()
	public name: string;

	@ApiProperty()
	public parentId: string;

	public constructor({ name, parentId }: CreateRequirement) {
		this.name = name;
		this.parentId = parentId;
	}
}
