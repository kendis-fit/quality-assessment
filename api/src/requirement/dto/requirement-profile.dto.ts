import IIndex from "../interfaces/index.interface";

export class RequirementProfile {
	public profile: IIndex[];

	public constructor({ profile }: RequirementProfile) {
		this.profile = profile;
	}
}
