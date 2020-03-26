import { Controller, Get, Query, Post, Param, Body } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('sr/project')
export class ProjectController {

    public constructor(projectService: ProjectService) {}

    @Get()
    public getProjects(@Query("offset")offset: number, @Query("size")size: number) {
    }

    @Get(":id")
    public getProjectById(@Param("id")id: number) {
    }

    @Post()
    public createProject(@Body()project: any) {
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
