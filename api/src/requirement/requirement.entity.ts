import {
	Model,
	Column,
	DataType,
	Table,
	HasMany,
	BelongsTo,
	ForeignKey,
	CreatedAt,
} from "sequelize-typescript";

import { StatusModificate } from "./requirement.enum";
import IIndex from "./interfaces/index.interface";

@Table({ tableName: "requirements" })
export class Requirement extends Model<Requirement> {
	@Column({
		type: DataType.BIGINT,
		primaryKey: true,
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

	@BelongsTo(() => Requirement)
	public parent: Requirement;

	@HasMany(() => Requirement)
	public requirements: Requirement[];

	@Column({
		type: DataType.ENUM(
			StatusModificate.NOT_MODIFICATED,
			StatusModificate.MODIFICATED,
		),
	})
	public statusModificate: StatusModificate;
}
