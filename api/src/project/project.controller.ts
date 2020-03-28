import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { Controller, Get, Query, Post, Param, Body } from "@nestjs/common";

import { ProjectService } from "./project.service";
import { RequirementListView } from "./dto/requirement-list-view.dto";
import { RequirementView } from "./dto/requirement-view.dto";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { CreatedRequirement } from "src/requirement/dto/created-requirement.dto";
import { ResultIndex } from "src/universal-project/dto/result-index.dto";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";

@ApiTags("projects")
@Controller("projects")
export class ProjectController {
	public constructor(private projectService: ProjectService) {}

	@ApiOkResponse({ type: RequirementListView })
	@Get()
	public async getProjects(
		@Query("offset") offset: number,
		@Query("size") size: number,
	): Promise<RequirementListView[]> {
		const projects = await this.projectService.findAll(offset, size);
		return projects.map(project => new RequirementListView(project));
	}

	@ApiOkResponse({ type: RequirementView })
	@Get(":id")
	public async getProjectById(
		@Param("id") id: number,
	): Promise<RequirementView> {
		const project = await this.projectService.findById(id);
		return new RequirementView(project);
	}

	@ApiOkResponse({ type: CreatedRequirement })
	@Post()
	public async createProject(
		@Body() project: CreateRequirement,
	): Promise<CreatedRequirement> {
		const newProject = await this.projectService.create(project);
		return new CreatedRequirement(newProject);
	}

	@ApiOkResponse({ type: ResultIndex })
	@Get(":id/indexes/:nameIndex")
	public async getIndexByRequirement(
		@Param("id") id: number,
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
	public async getDiagramByRequirement(
		@Param("id") id: number,
		@Param("nameIndex") nameIndex: string,
	): Promise<DiagramProfile[]> {
        const diagram = await this.projectService.generateDiagram(id, nameIndex);
        return diagram;
    }
}
