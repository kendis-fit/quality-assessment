import {
	Controller,
	Get,
	Param,
	Put,
	Post,
	Body,
	Delete,
} from "@nestjs/common";

import { CreateRequirement } from "./dto/create-requirement.dto";
import { RequirementProfile } from "./dto/requirement-profile.dto";
import { RequirementService } from "./requirement.service";

@Controller("sr/requirements")
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
	public updateRequirement(@Param("id") id: number, @Body() profile: any): void {
		this.requirementService.update(id, profile);
	}

	@Post()
	public createRequirement(@Body() requirement: CreateRequirement) {}

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
