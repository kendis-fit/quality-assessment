import { Injectable } from "@nestjs/common";

import { IConfig } from "./config.interface.js";
import configDatabase from "../../sequelize/config/config";

@Injectable()
export class ConfigService {
	private readonly config: IConfig;

	public constructor() {
		const modeApplication = process.env.NODE_ENV;

		this.config = {
			database: configDatabase[modeApplication],
		};
	}

	public get Database() {
		return this.config.database;
	}
}
