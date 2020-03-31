import { ApiTags, ApiOkResponse, ApiBody } from "@nestjs/swagger";
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
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { User } from "src/user/user.entity";
import { ResultIndex } from "./dto/result-index.dto";
import { ProjectView } from "./dto/project-view.dto";
import { CreateProject } from "./dto/create-project.dto";
import { ProjectListView } from "./dto/project-list-view.dto";
import IIndex from "src/requirement/interfaces/index.interface";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";
import { UniversalProjectService } from "./universal-project.service";
import { CreatedRequirement } from "src/requirement/dto/created-requirement.dto";

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
		const user: User = request.user;
		if (!user.projects.find(project => project.id === id)) {
			throw new HttpException({}, HttpStatus.FORBIDDEN);
		}
		const project = await this.projectService.findById(id);
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
		const user: User = request.user;
		if (!user.projects.find(project => project.id === id)) {
			throw new HttpException({}, HttpStatus.FORBIDDEN);
		}
		await this.projectService.updateById(id, profile);
	}

	@ApiOkResponse()
	@UseGuards(AuthGuard("jwt"))
	@Delete(":id")
	public async deleteProjectById(@Param("id") id: string, @Req() request) {
		const user: User = request.user;
		if (!user.projects.find(project => project.id === id)) {
			throw new HttpException({}, HttpStatus.FORBIDDEN);
		}
		await this.projectService.deleteByid(id);
	}

	@ApiOkResponse({ type: ResultIndex })
	@UseGuards(AuthGuard("jwt"))
	@Get(":id/indexes/:nameIndex")
	public async getIndexByProject(
		@Param("id") id: string,
		@Param("nameIndex") nameIndex: string,
		@Req() request
	): Promise<ResultIndex> {
		const user: User = request.user;
		if (!user.projects.find(project => project.id === id)) {
			throw new HttpException({}, HttpStatus.FORBIDDEN);
		}
		const result = await this.projectService.calculateIndexByProject(
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
		const user: User = request.user;
		if (!user.projects.find(project => project.id === id)) {
			throw new HttpException({}, HttpStatus.FORBIDDEN);
		}
        const diagram = await this.projectService.generateDiagram(id, nameIndex);
        return diagram;
    }
}
