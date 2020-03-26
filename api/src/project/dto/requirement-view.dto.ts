import { StatusModificate } from "src/requirement/requirement.enum";

export class RequirementView {
	public id: number;

	public name: string;

	public requirements: RequirementView[];

	public statusModificate: StatusModificate;

	public constructor({
		id,
		name,
		requirements,
		statusModificate,
	}: RequirementView) {
		this.id = id;
		this.name = name;
		this.requirements = requirements;
		this.statusModificate = statusModificate;
	}
}
