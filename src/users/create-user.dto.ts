import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'example@domen.com', description: 'Unique user email address'})
    @IsString({message: 'Email address is string'})
    @IsEmail({}, {message: 'Incorrect email passed'})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'User password'})
    @IsString({message: 'Password address is string'})
    @Length(4, 32, {message: 'Password must be at least 4 characters long and less than 32 characters long'})
    readonly password: string;
}