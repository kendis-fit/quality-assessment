import { Sequelize } from "sequelize-typescript";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { TYPE_PROFILE } from "src/json/json.providers";
import { SEQUELIZE } from "src/database/database.providers";
import { DiagramService } from "src/diagram/diagram.service";
import IIndex from "src/requirement/interfaces/index.interface";
import { Requirement } from "src/requirement/requirement.entity";
import { CreateProject } from "./dto/create-project.dto";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";
import { REQUIREMENT_REPOSITORY } from "src/requirement/requirement.providers";
import { CalculateProfileService } from "src/calculate-profile/calculate-profile.service";
import { Profile } from "src/json/profile.enum";

@Injectable()
export class ProjectService {
	public constructor(
		@Inject(REQUIREMENT_REPOSITORY)
		private requirements: typeof Requirement,
		@Inject(SEQUELIZE)
		private sequelize: Sequelize,
		@Inject(TYPE_PROFILE) private getProfile: (prof: Profile) => IIndex[],
		private calculateProfileService: CalculateProfileService,
		private diagramService: DiagramService
	) {}

	public async findAll(userId: string, offset: number, size: number): Promise<Requirement[]> {
		if (size > 100) {
			throw new HttpException("", HttpStatus.BAD_REQUEST);
		}
		return await this.requirements.findAll({
			where: {
				userId,
				parentId: null
			},
			offset,
			limit: size,
		});
	}

	public async findById(userId: string, id: string): Promise<Requirement> {
		const requirement = await this.requirements.findOne({
			where: {
				id: id,
				parentId: null,
			},
			include: [{ all: true }],
		});

		if (!requirement) {
			throw new HttpException({}, HttpStatus.NOT_FOUND);
		}
		if (requirement.userId !== userId) {
			throw new HttpException({}, HttpStatus.FORBIDDEN);
		}
		return requirement;
	}

	public async updateById(userId: string, id: string, profile: IIndex[]) {
		const project = await this.findById(userId, id);
		project.profile = profile;
		await project.save();
	}

	public async deleteByid(userId: string, id: string) {
		const project = await this.findById(userId, id);
		await project.destroy();
	}

	public async create(userId: string, project: CreateProject): Promise<Requirement> {
		const profile = this.getProfile(project.typeProfile);

		if (profile.length === 0) {
			throw new HttpException({}, HttpStatus.BAD_REQUEST);
		}

		const newProject = new Requirement({
			...project,
			userId,
			profile: [...profile]
		});
		await newProject.save();
		return newProject;
	}

	public async calculateIndexByProject(
		userId: string,
		id: string,
		nameIndex: string,
	): Promise<number> {
		const project = await this.findById(userId, id);
		const result = this.calculateProfileService.calculate(
			nameIndex,
			project.profile,
		);
		return result;
	}

	public async generateDiagram(
		userId: string,
		id: string,
		nameIndex: string
	): Promise<DiagramProfile[]> {
		const project = await this.findById(userId, id);
		const diagram = this.diagramService.create(nameIndex, project.profile);
		return diagram;
	}
}
