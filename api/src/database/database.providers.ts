import { Sequelize } from "sequelize-typescript";

import { User } from "src/user/user.entity";
import { ConfigService } from "src/config/config.service";
import { Requirement } from "src/requirement/requirement.entity";

export const SEQUELIZE = "SEQUELIZE";

export const databaseProviders = [
	{
		provide: SEQUELIZE,
		useFactory: async (config: ConfigService) => {
			const sequelize = new Sequelize(config.Database);
			sequelize.addModels([Requirement, User]);
			await sequelize.sync();
			return sequelize;
		},
		inject: [ConfigService],
	},
];
