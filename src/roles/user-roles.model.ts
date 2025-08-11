import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {Role} from "./role.model";


@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
    @Column({primaryKey: true, type: DataType.INTEGER, unique: true, autoIncrement: true})
    declare id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, unique: true})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

}