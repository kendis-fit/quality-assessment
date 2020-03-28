import { Sequelize } from "sequelize-typescript";

import { ConfigService } from "src/config/config.service";
import { Requirement } from "src/requirement/requirement.entity";
import { Project } from "src/universal-project/universal-project.entity";

export const SEQUELIZE = "SEQUELIZE";

export const databaseProviders = [
	{
		provide: SEQUELIZE,
		useFactory: async (config: ConfigService) => {
			const sequelize = new Sequelize(config.Database);
			sequelize.addModels([Requirement, Project]);
			await sequelize.sync();
			return sequelize;
		},
		inject: [ConfigService],
	},
];
