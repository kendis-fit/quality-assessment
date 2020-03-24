import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { Requirement } from "./requirement.entity";
import { REQUIREMENT_REPOSITORY } from "./requirement.providers";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { RequirementProfile } from "./dto/requirement-profile.dto";

@Injectable()
export class RequirementService {
	public constructor(
		@Inject(REQUIREMENT_REPOSITORY)
		private requirements: typeof Requirement,
	) {}

	public async findById(id: number): Promise<RequirementProfile> {
		const requirement = await this.requirements.findByPk(id);
		if (!requirement) {
			throw new HttpException("", HttpStatus.NOT_FOUND);
		}
		return new RequirementProfile(requirement);
	}

	public update(id: number) {}

	public create(requirement: CreateRequirement) {}

	public deleteById(id: number) {}

	public findIndexByRequirement(id: number, indexId: number) {}

	public findDiagramByRequirement(id: number, diagramId: number) {}
}
