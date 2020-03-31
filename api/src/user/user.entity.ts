import { Model, Table, Column, DataType, HasMany, Unique, IsEmail } from "sequelize-typescript";

import { Requirement } from "src/requirement/requirement.entity";
import { Project } from "src/universal-project/universal-project.entity";

@Table({ tableName: "users" })
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4
    })
    public id: string;

    @Unique
    @IsEmail
    @Column({
        type: DataType.STRING
    })
    public email: string;

    @Column({
        type: DataType.STRING
    })
    public name: string;

    @Column({
        type: DataType.STRING
    })
    public password: string;

    @HasMany(() => Requirement)
    public requirements: Requirement[];

    @HasMany(() => Project)
    public projects: Project[];
}