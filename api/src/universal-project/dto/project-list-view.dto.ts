import { ApiProperty } from "@nestjs/swagger";

export class ProjectListView {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public createdAt: Date;

	public constructor({ id, name, createdAt }: ProjectListView) {
		this.id = id;
		this.name = name;
		this.createdAt = createdAt;
	}
}
