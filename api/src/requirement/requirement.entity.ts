import {
	Model,
	Column,
	DataType,
	Table,
	HasMany,
	BelongsTo,
	ForeignKey,
	CreatedAt,
	UpdatedAt,
} from "sequelize-typescript";

import IIndex from "./interfaces/index.interface";
import { User } from "src/user/user.entity";

@Table({ tableName: "requirements" })
export class Requirement extends Model<Requirement> {
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

	@ForeignKey(() => Requirement)
	@Column({
		type: DataType.UUID,
		allowNull: true,
	})
	public parentId!: string;

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

	@BelongsTo(() => Requirement)
	public parent: Requirement;

	@HasMany(() => Requirement)
	public requirements: Requirement[];

	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID
	})
	public userId: string;

	@BelongsTo(() => User)
	public user: User;

	@Column({
		type: DataType.STRING
	})
	public typeProfile: string;
}
