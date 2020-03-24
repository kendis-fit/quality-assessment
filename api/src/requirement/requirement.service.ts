import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { Requirement } from "./requirement.entity";
import { REQUIREMENT_REPOSITORY } from "./requirement.providers";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { RequirementProfile } from "./dto/requirement-profile.dto";
import { StatusModificate } from "./requirement.enum";

@Injectable()
export class RequirementService {
	public constructor(
		@Inject(REQUIREMENT_REPOSITORY)
		private requirements: typeof Requirement,
	) {}

	public async findById(id: number): Promise<Requirement> {
		const requirement = await this.requirements.findByPk(id);
		if (!requirement) {
			throw new HttpException("", HttpStatus.NOT_FOUND);
		}
		return requirement;
	}

	public async update(id: number, profile: any): Promise<void> {
        const requirement = await this.findById(id);
        requirement.profile = profile;
        requirement.statusModificate = StatusModificate.MODIFICATED;
        await requirement.save();
    }

	public create(requirement: CreateRequirement) {}

	public deleteById(id: number) {}

	public findIndexByRequirement(id: number, indexId: number) {}

    public findDiagramByRequirement(id: number, diagramId: number) {}
}
