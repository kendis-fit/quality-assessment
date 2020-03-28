import {
	Controller,
	Get,
	Param,
	Put,
	Post,
	Body,
	Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import IIndex from "./interfaces/index.interface";
import { RequirementService } from "./requirement.service";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { RequirementProfile } from "./dto/requirement-profile.dto";
import { CreatedRequirement } from "./dto/created-requirement.dto";

@ApiTags("requirements")
@Controller("requirements")
export class RequirementController {
	public constructor(private requirementService: RequirementService) {}

	@Get(":id")
	public async getRequirement(
		@Param("id") id: number,
	): Promise<RequirementProfile> {
		const requirement = await this.requirementService.findById(id);
		return new RequirementProfile(requirement);
	}

	@Put(":id")
	public updateRequirement(
		@Param("id") id: number,
		@Body() profile: IIndex[],
	): void {
		this.requirementService.update(id, profile);
	}

	@Post()
	public async createRequirement(
		@Body() requirement: CreateRequirement,
	): Promise<CreatedRequirement> {
		const newRequirement = await this.requirementService.create(
			requirement,
		);
		return new CreatedRequirement(newRequirement);
	}

	@Delete(":id")
	public deleteRequirement(@Param("id") id: number) {
		this.requirementService.deleteById(id);
	}

	@Get(":id/indexes/:indexId")
	public getIndexByRequirement(
		@Param("id") id: number,
		@Param("indexId") indexId: number,
	) {}

	@Get(":id/diagrams/:digramId")
	public getDiagramByRequirement(
		@Param("id") id: number,
		@Param("diagramId") diagramId: number,
	) {}
}
