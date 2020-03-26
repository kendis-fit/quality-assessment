export class CreateRequirement {
	public name: string;

	public parentId: number;

	public constructor({ name, parentId }: CreateRequirement) {
		this.name = name;
		this.parentId = parentId;
	}
}
