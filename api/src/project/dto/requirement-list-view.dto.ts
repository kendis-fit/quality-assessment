import { ApiProperty } from "@nestjs/swagger";

export class RequirementListView {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public createdAt: string;

	@ApiProperty()
	public typeProfile: string;

	public constructor(id: string, name: string, createdAt: Date, typeProfile: string) {
		this.id = id;
		this.name = name;
		this.createdAt = createdAt.toDateString();
		this.typeProfile = typeProfile;
	}
}
