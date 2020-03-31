import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { Profile } from "src/json/profile.enum";
import { Project } from "./universal-project.entity";
import { TYPE_PROFILE } from "src/json/json.providers";
import { CreateProject } from "./dto/create-project.dto";
import { DiagramService } from "src/diagram/diagram.service";
import IIndex from "src/requirement/interfaces/index.interface";
import { PROJECT_REPOSITORY } from "./universal-project.providers";
import { CalculateProfileService } from "src/calculate-profile/calculate-profile.service";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";

@Injectable()
export class UniversalProjectService {
	public constructor(
		@Inject(PROJECT_REPOSITORY) private projects: typeof Project,
		@Inject(TYPE_PROFILE) private getProfile: (prof: Profile) => IIndex[],
		private calculateProfileService: CalculateProfileService,
		private diagramService: DiagramService
	) {}

	public async findAll(userId: number, offset: number, size: number): Promise<Project[]> {
		if (size > 100) {
			throw new HttpException("", HttpStatus.BAD_REQUEST);
		}
		return await this.projects.findAll({
			where: {
				userId
			},
			offset,
			limit: size,
		});
	}

	public async findById(userId: string, id: string): Promise<Project> {
		const project = await this.projects.findByPk(id);
		if (!project) {
			throw new HttpException({}, HttpStatus.NOT_FOUND);
		}
		if (project.userId !== userId) {
			throw new HttpException({}, HttpStatus.FORBIDDEN);
		}
		return project;
	}

	public async create(userId: string, project: CreateProject): Promise<Project> {
		const profile = this.getProfile(project.typeProfile);

		if (profile.length === 0) {
			throw new HttpException({}, HttpStatus.BAD_REQUEST);
		}

		const newProject = new Project({
			...project,
			userId,
			profile: [...profile],
		});
		await newProject.save();
		return newProject;
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
