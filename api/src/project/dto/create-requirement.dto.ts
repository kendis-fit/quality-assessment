import { Profile } from "src/json/profile.enum";

export class CreateRequirement {
	public name: string;
	public typeProject: Profile;

	public constructor({ name, typeProject }: CreateRequirement) {
		this.name = name;
		this.typeProject = typeProject;
	}
}
