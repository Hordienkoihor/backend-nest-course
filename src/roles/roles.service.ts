import { Injectable } from '@nestjs/common';
import {CreateRoleDto} from "./create-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./role.model";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private readonly roleRepository: typeof Role) {
    }

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto)
        return role;
    }

    async getRoleByValue(value:string){
        const role = await this.roleRepository.findOne({where: {value}})
        return role;
    }
}
