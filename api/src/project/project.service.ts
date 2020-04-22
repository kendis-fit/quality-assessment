import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { Profile } from "src/json/profile.enum";
import { TYPE_PROFILE, PROFILE } from "src/json/json.providers";
import { CreateProject } from "./dto/create-project.dto";
import { SEQUELIZE } from "src/database/database.providers";
import { DiagramService } from "src/diagram/diagram.service";
import IIndex from "src/project/interfaces/index.interface";
import { Requirement } from "src/requirement/requirement.entity";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";
import { REQUIREMENT_REPOSITORY } from "src/requirement/requirement.providers";
import { CalculateProfileService } from "src/calculate-profile/calculate-profile.service";
import { RequirementView } from "./dto/requirement-view.dto";
import { ProfileService } from "src/profile/profile.service";

@Injectable()
export class ProjectService {
	public constructor(
		private profileService: ProfileService,
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
				typeProfile: {
					[Op.ne]: PROFILE
				}
			},
			offset,
			limit: size,
		});
	}

	public async findByIdInDeapth(userId: string, id: string): Promise<RequirementView> {
		const rootProject = new RequirementView(await this.findById(userId, id));
		for (const project of rootProject.requirements) {
			project.requirements = (await this.findByIdInDeapth(userId, project.id)).requirements;
		}
		rootProject.requirements = rootProject.requirements.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
		return rootProject;
	}

	public async findById(userId: string, id: string): Promise<Requirement> {
		const requirement = await this.requirements.findOne({
			where: {
				id
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
		const requirement = await this.findById(userId, id);

		const transaction = await this.sequelize.transaction();
		try {
			const rootRequirement = await this.getRoot(userId, requirement);

			const counter: any = {
				i: 0,
			};

			this.removeChildren(requirement, counter);
			await requirement.destroy();

			const indexes = rootRequirement.profile;

			const profile = indexes.find(index => index.name === "I8");
			profile.coefficients = profile.coefficients
				.reverse()
				.slice(0, counter.i)
				.reverse();

			rootRequirement.profile = indexes;
			await rootRequirement.save();
			await transaction.commit();
		} catch {
			await transaction.rollback();
			throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
		}
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

	public async createRequirement(userId: string, id: string, requirement: CreateRequirement): Promise<Requirement> {
		// const transaction = await this.sequelize.transaction();

		try {
			const parentRequirement = await this.findById(userId, id);

			let profile: IIndex[] = null;

			if (!this.isGroup(parentRequirement)) {
				profile = [...this.getProfile(Profile.PROFILE)];
				const project = await this.getRoot(userId, parentRequirement);
				const indexes = project.profile.find(
					index => index.name === "I8",
				);

				const lengthCoeff = indexes.coefficients.length;
				let coeff: any = {};
				if (lengthCoeff === 0) {
					coeff = {
						name: "K1",
						value: null,
					};
				} else {
					const lastCoeff =
						indexes.coefficients[indexes.coefficients.length - 1];
					coeff = {
						name: `K${Number(lastCoeff.name.replace("K", "")) + 1}`,
						value: null,
					};
				}
				indexes.coefficients.push(coeff);

				await project.save();
			} else {
				profile = [...parentRequirement.profile];
				parentRequirement.profile = null;
				await parentRequirement.save();
			}

			const newRequirement = new Requirement({
				...requirement,
				userId,
				profile,
				parentId: id,
				typeProfile: PROFILE
			});
			await newRequirement.save();
			// await transaction.commit();

			return newRequirement;
		} catch {
			// await transaction.rollback();
			throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async calculateIndexByProject(
		userId: string,
		id: string,
		nameIndex: string,
	): Promise<number> {
		const project = await this.findById(userId, id);
		if (!this.profileService.isValid(project.profile)) {
			throw new HttpException({ reason: "Some value is empty or project wasn't saved" }, HttpStatus.BAD_REQUEST);
		}
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
		if (!this.profileService.isValid(project.profile)) {
			throw new HttpException({ reason: "Some value is empty or project wasn't saved" }, HttpStatus.BAD_REQUEST);
		}
		const diagram = this.diagramService.create(nameIndex, project.profile);
		return diagram;
	}

	private async getRoot(userId: string, requirement: Requirement): Promise<Requirement> {
		if (requirement.parentId === null) {
			return requirement;
		}
		const parentRequirement = await this.findById(userId, requirement.parentId);
		return this.getRoot(userId, parentRequirement);
	}

	private async removeChildren(
		requirement: Requirement,
		counter: { i: number },
	) {
		if (requirement.requirements.length > 0) {
			for (const req of requirement.requirements) {
				this.removeChildren(req, counter);
			}
		}

		if (requirement.profile === null) {
			counter.i++;
		}

		await requirement.destroy();
	}

	private isGroup(requirement: Requirement): boolean {
		return requirement.requirements.length === 0 && requirement.parentId !== null;
	}
}
