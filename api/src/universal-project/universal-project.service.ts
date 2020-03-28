import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { Profile } from "src/json/profile.enum";
import { Project } from "./universal-project.entity";
import { TYPE_PROFILE } from "src/json/json.providers";
import { CreateProject } from "./dto/create-project.dto";
import IIndex from "src/requirement/interfaces/index.interface";
import { PROJECT_REPOSITORY } from "./universal-project.providers";

@Injectable()
export class UniversalProjectService {
    public constructor(@Inject(PROJECT_REPOSITORY)private projects: typeof Project, @Inject(TYPE_PROFILE)private getProfile: (prof: Profile) => IIndex[]) {}

    public async findAll(offset: number, size: number): Promise<Project[]> {
		if (size > 100) {
			throw new HttpException("", HttpStatus.BAD_REQUEST);
		}
		return await this.projects.findAll({
			offset,
			limit: size,
		});
	}

	public async findById(id: number): Promise<Project> {
		const project = await this.projects.findByPk(id);

		if (!project) {
			throw new HttpException("", HttpStatus.NOT_FOUND);
		}
		return project;
	}

	public async create(project: CreateProject): Promise<Project> {
        const profile = this.getProfile(project.typeProfile);
        
        if (profile === []) {
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }

        const newProject = new Project({
			...project,
			profile: [...profile],
		});
		await newProject.save();
		return newProject;
	}

	public async updateById(id: number, profile: IIndex[]) {
		const project = await this.findById(id);
		project.profile = profile;
		await project.save();
	}

	public async deleteByid(id: number) {
		await this.projects.destroy({
			where: {
				id: id
			}
		});
	}
}
