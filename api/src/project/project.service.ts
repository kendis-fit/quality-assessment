import { Sequelize } from "sequelize-typescript";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { BASE_PROFILE } from "src/json/json.providers";
import { SEQUELIZE } from "src/database/database.providers";
import { DiagramService } from "src/diagram/diagram.service";
import IIndex from "src/requirement/interfaces/index.interface";
import { Requirement } from "src/requirement/requirement.entity";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";
import { REQUIREMENT_REPOSITORY } from "src/requirement/requirement.providers";
import { CalculateProfileService } from "src/calculate-profile/calculate-profile.service";

@Injectable()
export class ProjectService {
	public constructor(
		@Inject(REQUIREMENT_REPOSITORY)
		private requirements: typeof Requirement,
		@Inject(SEQUELIZE)
		private sequelize: Sequelize,
		@Inject(BASE_PROFILE)
		private profile: IIndex[],
		private calculateProfileService: CalculateProfileService,
		private diagramService: DiagramService
	) {}

	public async findAll(offset: number, size: number): Promise<Requirement[]> {
		if (size > 100) {
			throw new HttpException("", HttpStatus.BAD_REQUEST);
		}
		return await this.requirements.findAll({
			offset,
			limit: size,
		});
	}

	public async findById(id: number): Promise<Requirement> {
		const requirement = await this.requirements.findOne({
			where: {
				id: id,
				parentId: null,
			},
			include: [{ all: true }],
		});

		if (!requirement) {
			throw new HttpException("", HttpStatus.NOT_FOUND);
		}
		return requirement;
	}

	public async create(project: CreateRequirement): Promise<Requirement> {
		const newProject = new Requirement({
			...project,
			profile: [...this.profile],
		});
		await newProject.save();
		return newProject;
	}

	public async calculateIndexByProject(
		id: number,
		nameIndex: string,
	): Promise<number> {
		const project = await this.findById(id);
		const result = this.calculateProfileService.calculate(
			nameIndex,
			project.profile,
		);
		return result;
	}

	public async generateDiagram(
		id: number,
		nameIndex: string
	): Promise<DiagramProfile[]> {
		const project = await this.findById(id);
		const diagram = this.diagramService.create(nameIndex, project.profile);
		return diagram;
	}
}
