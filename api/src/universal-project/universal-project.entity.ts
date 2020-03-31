import {
	Model,
	Column,
	DataType,
	Table,
	CreatedAt,
	UpdatedAt,
	ForeignKey,
	BelongsTo
} from "sequelize-typescript";

import { User } from "src/user/user.entity";
import IIndex from "../requirement/interfaces/index.interface";

@Table({ tableName: "projects" })
export class Project extends Model<Project> {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4
	})
	public id: string;

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

	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID
	})
	public userId: string;

	@BelongsTo(() => User)
	public user: User;
}
