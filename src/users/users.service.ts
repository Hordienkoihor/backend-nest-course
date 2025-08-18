import {Injectable, NotFoundException, UseGuards} from '@nestjs/common';
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./create-user.dto";
import {RolesService} from "../roles/roles.service";
import e from "express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userRepository: typeof User,
                private readonly roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");

        if (!role) {
            throw new NotFoundException("Role Not Found");
        }
        await  user.$set('roles',[role.id])
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }
}
