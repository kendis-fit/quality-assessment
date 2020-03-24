import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { Requirement } from "./requirement.entity";
import { REQUIREMENT_REPOSITORY } from "./requirement.providers";
import { CreateRequirement } from "./dto/create-requirement.dto";
import { RequirementProfile } from "./dto/requirement-profile.dto";
import { StatusModificate } from "./requirement.enum";
import { SEQUELIZE } from "src/database/database.providers";
import { Sequelize } from "sequelize/types";
import IIndex from "./interfaces/index.interface";

@Injectable()
export class RequirementService {
	public constructor(
		@Inject(REQUIREMENT_REPOSITORY)
        private requirements: typeof Requirement,
        @Inject(SEQUELIZE)
        private sequelize: Sequelize
	) {}

	public async findById(id: number): Promise<Requirement> {
		const requirement = await this.requirements.findOne({
            where: {
                id: id,
                parentId: null
            },
            include: [Requirement]
        });
		if (!requirement) {
			throw new HttpException("", HttpStatus.NOT_FOUND);
		}
		return requirement;
	}

	public async update(id: number, profile: any): Promise<void> {
        const requirement = await this.findById(id);
        requirement.profile = profile;
        requirement.statusModificate = StatusModificate.MODIFICATED;
        await requirement.save();
    }

	public create(requirement: CreateRequirement) {}

	public async deleteById(id: number) {
        const requirement = await this.findById(id);
        
        const transaction = await this.sequelize.transaction();
        try
        {
            const rootRequirement = await this.getRoot(requirement);
            
            const counter: any = {
                i: 0
            };
            
            this.removeChildren(requirement, counter);
        
            const indexes = rootRequirement.profile as IIndex[];

            const profile = indexes.find(index => index.name === "I8");
            profile.coefficients = profile.coefficients.reverse().slice(0, counter.i).reverse();
            
            rootRequirement.profile = indexes;
            await rootRequirement.save();

            transaction.commit();
        }
        catch
        {
            transaction.rollback();
            throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	public findIndexByRequirement(id: number, indexId: number) {}

    public findDiagramByRequirement(id: number, diagramId: number) {}

    private async getRoot(requirement: Requirement): Promise<Requirement> {
        if (requirement.parentId === null) {
            return requirement;
        }
        const parentRequirement = await this.findById(requirement.parentId);
        return this.getRoot(parentRequirement);
    }

    private async removeChildren(requirement: Requirement, counter: any) {
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
                id: requirement.id
            }
        });
    }
}
