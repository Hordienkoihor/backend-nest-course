import {Injectable, NotFoundException} from '@nestjs/common';
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userRepository: typeof User,
                private readonly roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("CUSTOMER");

        if (!role) {
            throw new NotFoundException("Role Not Found");
        }
        await  user.$set('roles',[role.id])
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }
}
