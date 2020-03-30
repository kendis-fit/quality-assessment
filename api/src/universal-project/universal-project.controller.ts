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
} from "@nestjs/common";

import { CreateProject } from "./dto/create-project.dto";
import IIndex from "src/requirement/interfaces/index.interface";
import { UniversalProjectService } from "./universal-project.service";
import { ProjectListView } from "./dto/project-list-view.dto";
import { CreatedRequirement } from "src/requirement/dto/created-requirement.dto";
import { ProjectView } from "./dto/project-view.dto";
import { ResultIndex } from "./dto/result-index.dto";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";

@ApiTags("universal-projects")
@Controller("universal-projects")
export class UniversalProjectController {
	public constructor(private projectService: UniversalProjectService) {}

	@ApiOkResponse({ type: [ProjectListView] })
	@Get()
	public async getProjects(
		@Query("offset") offset: number,
		@Query("size") size: number,
	): Promise<ProjectListView[]> {
		const projects = await this.projectService.findAll(offset, size);
		return projects.map(project => new ProjectListView(project));
	}

	@ApiOkResponse({ type: ProjectView })
	@Get(":id")
	public async getProjectById(@Param("id") id: string): Promise<ProjectView> {
		const project = await this.projectService.findById(id);
		return new ProjectView(project);
	}

	@ApiBody({ type: CreateProject })
	@ApiOkResponse({ type: CreatedRequirement })
	@Post()
	public async createProject(
		@Body() project: CreateProject,
	): Promise<CreatedRequirement> {
		const newProject = await this.projectService.create(project);
		return new CreatedRequirement(newProject);
	}

	@ApiBody({ type: [IIndex] })
	@ApiOkResponse()
	@Put(":id")
	public async updateProjectById(
		@Param("id") id: string,
		@Body() profile: IIndex[],
	) {
		await this.projectService.updateById(id, profile);
	}

	@ApiOkResponse()
	@Delete(":id")
	public async deleteProjectById(@Param("id") id: string) {
		await this.projectService.deleteByid(id);
	}

	@ApiOkResponse({ type: ResultIndex })
	@Get(":id/indexes/:nameIndex")
	public async getIndexByProject(
		@Param("id") id: string,
		@Param("nameIndex") nameIndex: string,
	): Promise<ResultIndex> {
		const result = await this.projectService.calculateIndexByProject(
			id,
			nameIndex,
		);
		const resultIndex = new ResultIndex({ result });
		return resultIndex;
	}

    @ApiOkResponse({ type: [DiagramProfile] })
	@Get(":id/diagrams/:nameIndex")
	public async getDiagramByProject(
		@Param("id") id: string,
		@Param("nameIndex") nameIndex: string,
	): Promise<DiagramProfile[]> {
        const diagram = await this.projectService.generateDiagram(id, nameIndex);
        return diagram;
    }
}
