import { ApiProperty } from "@nestjs/swagger";

export class CreatedRequirement {
	@ApiProperty()
	public id: number;

	public constructor({ id }: CreatedRequirement) {
		this.id = id;
	}
}
