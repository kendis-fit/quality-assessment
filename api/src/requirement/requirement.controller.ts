import {
	Controller,
	Get,
	Param,
	Put,
	Post,
	Body,
	Delete,
	UseGuards,
	Req,
} from "@nestjs/common";
import {
	ApiTags,
	ApiOkResponse,
	ApiBody,
	ApiNotFoundResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

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
	@UseGuards(AuthGuard("jwt"))
	@Get(":id")
	public async getRequirement(
		@Param("id") id: string,
		@Req() request	
	): Promise<RequirementProfile> {
		const requirement = await this.requirementService.findById(request.user.id, id);
		return new RequirementProfile(requirement);
	}

	@ApiOkResponse()
	@ApiNotFoundResponse()
	@ApiBody({ type: [IIndex] })
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	public async updateRequirement(
		@Param("id") id: string,
		@Body() profile: IIndex[],
		@Req() request
	): Promise<void> {
		await this.requirementService.update(request.user.id, id, profile);
	}

	@ApiOkResponse({ type: CreatedRequirement })
	@UseGuards(AuthGuard("jwt"))
	@Post()
	public async createRequirement(
		@Body() requirement: CreateRequirement,
		@Req() request
	): Promise<CreatedRequirement> {
		const newRequirement = await this.requirementService.create(
			request.user.id,
			requirement,
		);
		return new CreatedRequirement(newRequirement);
	}

	@ApiOkResponse()
	@UseGuards(AuthGuard("jwt"))
	@Delete(":id")
	public async deleteRequirement(@Param("id") id: string, @Req() request): Promise<void> {
		await this.requirementService.deleteById(request.user.id, id);
	}

	@ApiOkResponse({ type: ResultIndex })
	@UseGuards(AuthGuard("jwt"))
	@Get(":id/indexes/:nameIndex")
	public async getIndexByRequirement(
		@Param("id") id: string,
		@Param("nameIndex") nameIndex: string,
		@Req() request
	): Promise<ResultIndex> {
		const result = await this.requirementService.calculateIndexByProject(
			request.user.id,
			id,
			nameIndex,
		);
		const resultIndex = new ResultIndex({ result });
		return resultIndex;
	}

	@ApiOkResponse({ type: [DiagramProfile] })
	@UseGuards(AuthGuard("jwt"))
	@Get(":id/diagrams/:nameIndex")
	public async getDiagramByRequirement(
		@Param("id") id: string,
		@Param("nameIndex") nameIndex: string,
		@Req() request
	): Promise<DiagramProfile[]> {
        const diagram = await this.requirementService.generateDiagram(request.user.id, id, nameIndex);
        return diagram;
    }
}
