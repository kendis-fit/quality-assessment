import { Sequelize } from "sequelize-typescript";
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { BASE_PROFILE } from 'src/json/json.providers';
import { SEQUELIZE } from 'src/database/database.providers';
import IIndex from 'src/requirement/interfaces/index.interface';
import { Requirement } from 'src/requirement/requirement.entity';
import { REQUIREMENT_REPOSITORY } from 'src/requirement/requirement.providers';
import { CreateRequirement } from "./dto/create-requirement.dto";

@Injectable()
export class ProjectService {

    public constructor(
		@Inject(REQUIREMENT_REPOSITORY)
        private requirements: typeof Requirement,
        @Inject(SEQUELIZE)
        private sequelize: Sequelize,
        @Inject(BASE_PROFILE)
        private profile: IIndex[]
	) {}

    public async findAll(offset: number, size: number): Promise<Requirement[]> {
        if (size > 100) {
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }
        return await this.requirements.findAll({
            offset,
            limit: size
        });
    }

    public async findById(id: number): Promise<Requirement> {
        const requirement = await this.requirements.findByPk(id);
        
        if (!requirement) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        return requirement;
    }

    public async create(project: CreateRequirement): Promise<Requirement> {
        const newProject = new Requirement({ ...project, profile: [...this.profile] });
        await newProject.save();
        return newProject;
    }
}
