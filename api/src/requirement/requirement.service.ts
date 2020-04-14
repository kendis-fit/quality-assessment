import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import IIndex from "./interfaces/index.interface";
import { PROFILE } from "src/json/json.providers";
import { Requirement } from "./requirement.entity";
import { SEQUELIZE } from "src/database/database.providers";
import { DiagramService } from "src/diagram/diagram.service";
import { CreateRequirement } from "../project/dto/create-requirement.dto";
import { REQUIREMENT_REPOSITORY } from "./requirement.providers";
import { CalculateProfileService } from "src/calculate-profile/calculate-profile.service";
import { DiagramProfile } from "src/diagram/dto/diagram-profile.dto";

@Injectable()
export class RequirementService {
	public constructor(
		@Inject(REQUIREMENT_REPOSITORY)
		private requirements: typeof Requirement,
		@Inject(SEQUELIZE)
		private sequelize: Sequelize,
		@Inject(PROFILE)
		private profile: IIndex[],
		private calculateProfileService: CalculateProfileService,
		private diagramService: DiagramService
	) {}

	public async findById(userId: string, id: string): Promise<Requirement> {
		const requirement = await this.requirements.findOne({
			where: {
				id: id,
				parentId: {
					[Op.ne]: null,
				},
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

	public async update(userId: string, id: string, profile: IIndex[]): Promise<void> {
		const requirement = await this.findById(userId, id);
		requirement.profile = profile;
		await requirement.save();
	}

	public async create(userId: string, requirement: CreateRequirement): Promise<Requirement> {
		const transaction = await this.sequelize.transaction();

		try {
			const parentRequirement = await this.findById(userId, requirement.parentId);

			let profile: IIndex[] = null;

			if (this.isGroup(parentRequirement)) {
				profile = [...this.profile];
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
				typeProfile: "PROFILE"
			});
			await newRequirement.save();
			await transaction.commit();

			return newRequirement;
		} catch {
			await transaction.rollback();
			throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async deleteById(userId: string, id: string) {
		const requirement = await this.findById(userId, id);

		const transaction = await this.sequelize.transaction();
		try {
			const rootRequirement = await this.getRoot(userId, requirement);

			const counter: any = {
				i: 0,
			};

			this.removeChildren(requirement, counter);

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

		this.requirements.destroy({
			where: {
				id: requirement.id,
			},
		});
	}

	private isGroup(requirement: Requirement): boolean {
		return (
			requirement.requirements.length > 0 && requirement.parentId === null
		);
	}
}
