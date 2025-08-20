import {HttpException, HttpStatus, Injectable, NotFoundException, UseGuards} from '@nestjs/common';
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./create-user.dto";
import {RolesService} from "../roles/roles.service";
import e from "express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {AddRoleDto} from "./add-role.dto";
import {BanUserDto} from "./ban-user.dto";

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

    async addRole(dto: AddRoleDto) {
        const user =  await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (role && user){
            await user.$add('roles', role.id);
            return dto
        }

        throw new HttpException("Role or User not found", HttpStatus.NOT_FOUND);
    }

    async ban(banUserDto: BanUserDto) {
        const user =  await this.userRepository.findByPk(banUserDto.userId);

        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        user.banned = true;
        user.banReason = banUserDto.banReason;

        await user.save();
        return user;
    }
}
