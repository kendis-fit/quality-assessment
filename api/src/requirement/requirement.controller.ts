import { Controller, Get, Query, Param, Put, Post, Body, Delete } from "@nestjs/common";

import { CreateRequirement } from "./dto/create-requirement.dto";

@Controller("sr/requirements")
export class RequirementController {

	@Get(":id")
	public getRequirement(@Param("id")id: number) {
	}

	@Put(":id")
	public updateRequirement(@Param("id")id: number) {
	}

	@Post()
	public createRequirement(@Body()requirement: CreateRequirement) {
	}

	@Delete(":id")
	public deleteRequirement(@Param("id")id: number) {
	}

	@Get(":id/indexes/:indexId")
	public getIndexByRequirement(@Param("id")id: number, @Param("indexId")indexId: number) {
	}


	@Get(":id/diagrams/:digramId")
	public getDiagramByRequirement(@Param("id")id: number, @Param("diagramId")diagramId: number) {
	}
}
