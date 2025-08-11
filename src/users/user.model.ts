import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/role.model";
import {UserRoles} from "../roles/user-roles.model";

interface UserCreationAttribute {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttribute> {
    @ApiProperty({example: '1', description: 'Unique identifier '})
    @Column({primaryKey: true, type: DataType.INTEGER, unique: true, autoIncrement: true})
    declare id: number;

    @ApiProperty({example: 'example@domen.com', description: 'Unique user email address'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: "12345", description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'false', description: 'User banned status'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'user agreement violation', description: 'explanation to reason for banning user'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}