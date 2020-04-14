import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { Controller, Get, Query, Post, Param, Body, UseGuards, Req, Put, Delete } from "@nestjs/common";

import { ProjectService } from "./project.service";
import { RequirementListView } from "./dto/requirement-list-view.dto";
import { RequirementView } from "./dto/requirement-view.dto";
import { CreateProject } from "./dto/create-project.dto";
import { CreatedRequirement } from "src/project/dto/created-requirement.dto";
import { RequirementProfile } from "src/project/dto/requirement-profile.dto";
import { ResultIndex } from "src/project/dto/result-index.dto";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";
import { AuthGuard } from "@nestjs/passport";
import IIndex from "src/project/interfaces/index.interface";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { CheckProject } from "./dto/check-project.dto";
import { Profile } from "src/json/profile.enum";

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
		return projects.map(project => new RequirementListView(project.id, project.name, project.createdAt, project.typeProfile));
	}

	@ApiOkResponse({ type: RequirementView })
	@UseGuards(AuthGuard("jwt"))
	@Get(":id/requirements")
	public async getProjectByIdWithRequirements(
		@Param("id") id: string,
		@Req() request
	): Promise<RequirementView> {
		const project = await this.projectService.findById(request.user.id, id);
		return new RequirementView(project);
	}

	@ApiOkResponse({ type: RequirementProfile })
	@UseGuards(AuthGuard("jwt"))
	@Get(":id")
	public async getProjectById(
		@Param("id") id: string,
		@Req() request
	): Promise<RequirementProfile> {
		const project = await this.projectService.findById(request.user.id, id);
		return new RequirementProfile(project);
	}

	@ApiOkResponse({ type: CheckProject })
	@UseGuards(AuthGuard("jwt"))
	@Get(":id/is-multiple")
	public async isProjectMultiple(@Param("id")id: string, @Req() request): Promise<CheckProject> {
		const project = await this.projectService.findById(request.user.id, id);
		return new CheckProject({ isMultiple: project.typeProfile === Profile.BASE_PROFILE });
	}

	@ApiOkResponse({ type: RequirementListView })
	@UseGuards(AuthGuard("jwt"))
	@Post()
	public async createProject(
		@Body() project: CreateProject,
		@Req() request
	): Promise<RequirementListView> {
		const newProject = await this.projectService.create(request.user.id, project);
		return new RequirementListView(newProject.id, newProject.name, newProject.createdAt, newProject.typeProfile);
	}

	@ApiOkResponse({ type: CreatedRequirement })
	@UseGuards(AuthGuard("jwt"))
	@Post(":id/requirements")
	public async createRequirement(
		@Param("id") id: string,
		@Body() project: CreateRequirement,
		@Req() request
	): Promise<CreatedRequirement> {
		const newProject = await this.projectService.createRequirement(request.user.id, id, project);
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
}
