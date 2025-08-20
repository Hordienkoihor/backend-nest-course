import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/role.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/user.model";

interface PostCreationAttribute {
    title: string;
    content: string;
    userId: number;
    image: string;

}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttribute> {
    // @ApiProperty({example: '1', description: 'Unique identifier '})
    @Column({primaryKey: true, type: DataType.INTEGER, unique: true, autoIncrement: true})
    declare id: number;

    // @ApiProperty({example: 'example@domen.com', description: 'Unique user email address'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    // @ApiProperty({example: "12345", description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    // @ApiProperty({example: 'false', description: 'User banned status'})
    @Column({type: DataType.STRING})
    image: boolean;

    // @ApiProperty({example: 'user agreement violation', description: 'explanation to reason for banning user'})
    // @Column({type: DataType.STRING, allowNull: true})
    // banReason: string;
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;


    @BelongsTo(() => User)
    author: User
}