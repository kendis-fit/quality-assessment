import { Sequelize } from "sequelize-typescript";
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { BASE_PROFILE } from 'src/json/json.providers';
import { SEQUELIZE } from 'src/database/database.providers';
import IIndex from 'src/requirement/interfaces/index.interface';
import { Requirement } from 'src/requirement/requirement.entity';
import { REQUIREMENT_REPOSITORY } from 'src/requirement/requirement.providers';

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

    public findById(id: number) {
    }

    public create(project: any) {
    }
}
