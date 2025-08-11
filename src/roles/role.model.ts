import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationAttribute {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttribute> {
    @ApiProperty({example: '1', description: 'Unique identifier '})
    @Column({primaryKey: true, type: DataType.INTEGER, unique: true, autoIncrement: true})
    declare id: number;

    @ApiProperty({example: 'CUSTOMER', description: 'User role value'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: "Покупець", description: 'User role description'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}