import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'example@domen.com', description: 'Unique user email address'})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'User password'})
    readonly password: string;
}