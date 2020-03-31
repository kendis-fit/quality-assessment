import { ApiTags, ApiOkResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, Get, Query, Post, Param, Body, UseGuards, Req } from "@nestjs/common";

import { ProjectService } from "./project.service";
import { RequirementListView } from "./dto/requirement-list-view.dto";
import { RequirementView } from "./dto/requirement-view.dto";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { CreatedRequirement } from "src/requirement/dto/created-requirement.dto";
import { ResultIndex } from "src/universal-project/dto/result-index.dto";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiBearerAuth()
@ApiTags("projects")
@Controller("projects")
export class ProjectController {
	public constructor(private projectService: ProjectService) {}

	@ApiOkResponse({ type: RequirementListView })
	@UseGuards(AuthGuard("jwt"))
	@Get()
	public async getProjects(
		@Query("offset") offset: number,
		@Query("size") size: number,
		@Req() request
	): Promise<RequirementListView[]> {
		const projects = await this.projectService.findAll(request.user.id, offset, size);
		return projects.map(project => new RequirementListView(project));
	}

	@ApiOkResponse({ type: RequirementView })
	@UseGuards(AuthGuard("jwt"))
	@Get(":id")
	public async getProjectById(
		@Param("id") id: string,
		@Req() request
	): Promise<RequirementView> {
		const project = await this.projectService.findById(request.user.id, id);
		return new RequirementView(project);
	}

	@ApiOkResponse({ type: CreatedRequirement })
	@UseGuards(AuthGuard("jwt"))
	@Post()
	public async createProject(
		@Body() project: CreateRequirement,
		@Req() request
	): Promise<CreatedRequirement> {
		const newProject = await this.projectService.create(request.user.id, project);
		return new CreatedRequirement(newProject);
	}

	@ApiOkResponse({ type: ResultIndex })
	@UseGuards(AuthGuard("jwt"))
	@Get(":id/indexes/:nameIndex")
	public async getIndexByRequirement(
		@Param("id") id: string,
		@Param("nameIndex") nameIndex: string,
		@Req() request
	): Promise<ResultIndex> {
		const result = await this.projectService.calculateIndexByProject(
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
        const diagram = await this.projectService.generateDiagram(request.user.id, id, nameIndex);
        return diagram;
    }
}
