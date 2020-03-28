import {
	Model,
	Column,
	DataType,
	Table,
	CreatedAt,
	UpdatedAt,
} from "sequelize-typescript";

import IIndex from "../requirement/interfaces/index.interface";

@Table({ tableName: "projects" })
export class Project extends Model<Project> {
	@Column({
		type: DataType.BIGINT,
		primaryKey: true,
		autoIncrement: true
	})
	public id: number;

	@Column({
		type: DataType.STRING,
	})
	public name: string;

	@Column({
		type: DataType.JSONB,
		allowNull: true,
	})
	public profile: IIndex[];

	@CreatedAt
	@Column({
		type: DataType.DATE,
	})
	public createdAt: Date;

	@UpdatedAt
	@Column({
		type: DataType.DATE,
	})
	public updatedAt: Date;
}
