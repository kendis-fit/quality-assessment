import { Controller, Get, Query, Post, Param, Body } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { RequirementListView } from "./dto/requirement-list-view.dto";
import { RequirementView } from "./dto/requirement-view.dto";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { CreatedRequirement } from "src/requirement/dto/created-requirement.dto";

@Controller("sr/project")
export class ProjectController {
	public constructor(private projectService: ProjectService) {}

	@Get()
	public async getProjects(
		@Query("offset") offset: number,
		@Query("size") size: number,
	): Promise<RequirementListView[]> {
		const projects = await this.projectService.findAll(offset, size);
		return projects.map(project => new RequirementListView(project));
	}

	@Get(":id")
	public async getProjectById(
		@Param("id") id: number,
	): Promise<RequirementView> {
		const project = await this.projectService.findById(id);
		return new RequirementView(project);
	}

	@Post()
	public async createProject(
		@Body() project: CreateRequirement,
	): Promise<CreatedRequirement> {
		const newProject = await this.projectService.create(project);
		return new CreatedRequirement(newProject);
	}

	@Get(":id/indexes/:indexId")
	public getIndexByProject(
		@Param("id") id: number,
		@Param("indexId") indexId: number,
	) {}

	@Get(":id/diagrams/:digramId")
	public getDiagramByProject(
		@Param("id") id: number,
		@Param("diagramId") diagramId: number,
	) {}
}
