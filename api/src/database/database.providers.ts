import { Sequelize } from "sequelize-typescript";

export const databaseProviders = [
	{
		provide: "SEQUELIZE",
		useFactory: async () => {
			const sequelize = new Sequelize({});
			sequelize.addModels([]);
			await sequelize.sync();
			return sequelize;
		},
	},
];
