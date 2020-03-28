import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { Controller, Get, Query, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { UniversalProjectService } from "./universal-project.service";

@ApiTags("universal-projects")
@Controller("universal-projects")
export class UniversalProjectController {
    public constructor(private projectService: UniversalProjectService) {}

    @ApiOkResponse()
    @Get()
    public async getProjects(@Query("offset")offset: number, @Query("size")size: number) {
    }

    @ApiOkResponse()
    @Get(":id")
    public async getProjectById(@Param("id")id: number) {
    }

    @ApiOkResponse()
    @Post()
    public async create(@Body()project: any) {
    }   

    @ApiOkResponse()
    @Put(":id")
    public async update(@Param()id: number, @Body()project: any) {
    }

    @ApiOkResponse()
    @Delete(":id")
    public async deleteById(@Param()id: number) {
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