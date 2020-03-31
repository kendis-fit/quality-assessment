import { ApiTags, ApiOkResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import {
	Controller,
	Get,
	Query,
	Param,
	Post,
	Body,
	Put,
	Delete,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ResultIndex } from "./dto/result-index.dto";
import { ProjectView } from "./dto/project-view.dto";
import { CreateProject } from "./dto/create-project.dto";
import { ProjectListView } from "./dto/project-list-view.dto";
import IIndex from "src/requirement/interfaces/index.interface";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";
import { UniversalProjectService } from "./universal-project.service";
import { CreatedRequirement } from "src/requirement/dto/created-requirement.dto";

@ApiBearerAuth()
@ApiTags("universal-projects")
@Controller("universal-projects")
export class UniversalProjectController {
	public constructor(private projectService: UniversalProjectService) {}

	@ApiOkResponse({ type: [ProjectListView] })
	@UseGuards(AuthGuard("jwt"))
	@Get()
	public async getProjects(
		@Query("offset") offset: number,
		@Query("size") size: number,
		@Req() request
	): Promise<ProjectListView[]> {
		const projects = await this.projectService.findAll(request.user.id, offset, size);
		return projects.map(project => new ProjectListView(project));
	}

	@ApiOkResponse({ type: ProjectView })
	@UseGuards(AuthGuard("jwt"))
	@Get(":id")
	public async getProjectById(@Param("id") id: string, @Req() request): Promise<ProjectView> {
		const project = await this.projectService.findById(request.user.id, id);
		return new ProjectView(project);
	}

	@ApiBody({ type: CreateProject })
	@ApiOkResponse({ type: CreatedRequirement })
	@UseGuards(AuthGuard("jwt"))
	@Post()
	public async createProject(
		@Body() project: CreateProject,
		@Req() request
	): Promise<CreatedRequirement> {
		const newProject = await this.projectService.create(request.user.id, project);
		return new CreatedRequirement(newProject);
	}

	@ApiBody({ type: [IIndex] })
	@ApiOkResponse()
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	public async updateProjectById(
		@Param("id") id: string,
		@Body() profile: IIndex[],
		@Req() request
	) {
		await this.projectService.updateById(request.user.id, id, profile);
	}

	@ApiOkResponse()
	@UseGuards(AuthGuard("jwt"))
	@Delete(":id")
	public async deleteProjectById(@Param("id") id: string, @Req() request) {
		await this.projectService.deleteByid(request.user.id, id);
	}

	@ApiOkResponse({ type: ResultIndex })
	@UseGuards(AuthGuard("jwt"))
	@Get(":id/indexes/:nameIndex")
	public async getIndexByProject(
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
	public async getDiagramByProject(
		@Param("id") id: string,
		@Param("nameIndex") nameIndex: string,
		@Req() request
	): Promise<DiagramProfile[]> {
        const diagram = await this.projectService.generateDiagram(request.user.id, id, nameIndex);
        return diagram;
    }
}
