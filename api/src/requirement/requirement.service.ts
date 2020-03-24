import { Injectable, Inject } from '@nestjs/common';

import { Requirement } from './requirement.entity';
import { REQUIREMENT_REPOSITORY } from './requirement.providers';
import { CreateRequirement } from './dto/create-requirement.dto';

@Injectable()
export class RequirementService 
{
    public constructor(@Inject(REQUIREMENT_REPOSITORY)private requirements: typeof Requirement) {}

	public findById(id: number) {
	}

	public update(id: number) {
	}

	public create(requirement: CreateRequirement) {
	}

	public deleteById(id: number) {
	}

	public findIndexByRequirement(id: number, indexId: number) {
	}

	public findDiagramByRequirement(id: number, diagramId: number) {
	}
}
