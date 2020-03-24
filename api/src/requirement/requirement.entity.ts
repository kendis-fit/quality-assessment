import { Model, Column, DataType, Table, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";

import { StatusModificate } from "./requirement.enum";

@Table({ tableName: "requirements" })
export class Requirement extends Model<Requirement>
{    
    @Column({
        type: DataType.BIGINT,
        primaryKey: true
    })
    public id: number;

    @Column({
        type: DataType.STRING
    })
    public name: string;

    @Column({
        type: DataType.JSONB
    })
    public profile: any;

    @ForeignKey(() => Requirement)
    public parentId?: number;

    @BelongsTo(() => Requirement)
    public parent: Requirement;

    @HasMany(() => Requirement)
    public requirements: Requirement[];

    @Column({
        type: DataType.ENUM(StatusModificate.NOT_MODIFICATED, StatusModificate.MODIFICATED)
    })
    public statusModificate: StatusModificate;
}