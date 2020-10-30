import { ApiProperty } from "@nestjs/swagger";

export class CreateRequirement {
	@ApiProperty()
	public name: string;

	public constructor({ name }: CreateRequirement) {
		this.name = name;
	}
}
