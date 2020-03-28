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

@Table({ tableName: "requirements" })
export class Requirement extends Model<Requirement> {
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

	@Column({
		type: DataType.BIGINT,
		allowNull: true,
	})
	@ForeignKey(() => Requirement)
	public parentId!: number;

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
}
