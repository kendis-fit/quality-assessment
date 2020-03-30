import {
	Controller,
	Get,
	Param,
	Put,
	Post,
	Body,
	Delete,
} from "@nestjs/common";
import {
	ApiTags,
	ApiOkResponse,
	ApiBody,
	ApiNotFoundResponse,
} from "@nestjs/swagger";

import IIndex from "./interfaces/index.interface";
import { RequirementService } from "./requirement.service";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { RequirementProfile } from "./dto/requirement-profile.dto";
import { CreatedRequirement } from "./dto/created-requirement.dto";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";
import { ResultIndex } from "src/universal-project/dto/result-index.dto";

@ApiTags("requirements")
@Controller("requirements")
export class RequirementController {
	public constructor(private requirementService: RequirementService) {}

	@ApiNotFoundResponse()
	@ApiOkResponse({ type: RequirementProfile })
	@Get(":id")
	public async getRequirement(
		@Param("id") id: string,
	): Promise<RequirementProfile> {
		const requirement = await this.requirementService.findById(id);
		return new RequirementProfile(requirement);
	}

	@ApiOkResponse()
	@ApiNotFoundResponse()
	@ApiBody({ type: [IIndex] })
	@Put(":id")
	public updateRequirement(
		@Param("id") id: string,
		@Body() profile: IIndex[],
	): void {
		this.requirementService.update(id, profile);
	}

	@ApiOkResponse({ type: CreatedRequirement })
	@Post()
	public async createRequirement(
		@Body() requirement: CreateRequirement,
	): Promise<CreatedRequirement> {
		const newRequirement = await this.requirementService.create(
			requirement,
		);
		return new CreatedRequirement(newRequirement);
	}

	@ApiOkResponse()
	@Delete(":id")
	public deleteRequirement(@Param("id") id: string) {
		this.requirementService.deleteById(id);
	}

	@ApiOkResponse({ type: ResultIndex })
	@Get(":id/indexes/:nameIndex")
	public async getIndexByRequirement(
		@Param("id") id: string,
		@Param("nameIndex") nameIndex: string,
	): Promise<ResultIndex> {
		const result = await this.requirementService.calculateIndexByProject(
			id,
			nameIndex,
		);
		const resultIndex = new ResultIndex({ result });
		return resultIndex;
	}

    @ApiOkResponse({ type: [DiagramProfile] })
	@Get(":id/diagrams/:nameIndex")
	public async getDiagramByRequirement(
		@Param("id") id: string,
		@Param("nameIndex") nameIndex: string,
	): Promise<DiagramProfile[]> {
        const diagram = await this.requirementService.generateDiagram(id, nameIndex);
        return diagram;
    }
}
