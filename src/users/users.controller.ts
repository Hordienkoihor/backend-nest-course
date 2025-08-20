import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./add-role.dto";
import {BanUserDto} from "./ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {
    }

    @ApiOperation({summary: 'Create a new user'})
    @ApiResponse({status: 200, type: User})
    // @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    // @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Set role'})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/role")
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.userService.addRole(addRoleDto);
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/ban")
    banUser(@Body() banUserDto: BanUserDto) {
        return this.userService.ban(banUserDto);
    }


}
