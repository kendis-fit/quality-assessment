import { ApiTags, ApiOkResponse, ApiBody } from "@nestjs/swagger";
import { Controller, Get, Query, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { UniversalProjectService } from "./universal-project.service";
import { CreateProject } from "./dto/create-project.dto";
import IIndex from "src/requirement/interfaces/index.interface";

@ApiTags("universal-projects")
@Controller("universal-projects")
export class UniversalProjectController {
    public constructor(private projectService: UniversalProjectService) {}

    @ApiOkResponse()
    @Get()
    public async getProjects(@Query("offset")offset: number, @Query("size")size: number) {
        const projects = await this.projectService.findAll(offset, size);
        return projects;
    }

    @ApiOkResponse()
    @Get(":id")
    public async getProjectById(@Param("id")id: number) {
        const project = await this.projectService.findById(id);
        return project;
    }

    @ApiBody({ type: CreateProject })
    @ApiOkResponse()
    @Post()
    public async createProject(@Body()project: CreateProject) {
        await this.projectService.create(project);
    }

    @ApiOkResponse()
    @Put(":id")
    public async updateProjectById(@Param()id: number, @Body()profile: IIndex[]) {
        await this.projectService.updateById(id, profile);
    }

    @ApiOkResponse()
    @Delete(":id")
    public async deleteProjectById(@Param()id: number) {
        await this.projectService.deleteByid(id);
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