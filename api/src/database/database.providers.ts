import { Sequelize } from "sequelize-typescript";

import { Requirement } from "src/requirement/requirement.entity";

export const SEQUELIZE = "SEQUELIZE";

export const databaseProviders = [
	{
		provide: SEQUELIZE,
		useFactory: async () => {
			const sequelize = new Sequelize({});
			sequelize.addModels([Requirement]);
			await sequelize.sync();
			return sequelize;
		},
	},
];
