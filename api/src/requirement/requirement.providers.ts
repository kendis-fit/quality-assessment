import { Requirement } from "./requirement.entity";

export const REQUIREMENT_REPOSITORY = "REQUIREMENT_REPOSITORY";

export const requirementProviders = [
	{
		provide: REQUIREMENT_REPOSITORY,
		useValue: Requirement,
	},
];
