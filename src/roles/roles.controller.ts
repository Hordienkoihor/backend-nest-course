import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateRoleDto} from "./create-role.dto";
import {RolesService} from "./roles.service";

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {
    }

    @Post()
    create(@Body() roleDto: CreateRoleDto) {
        return  this.roleService.createRole(roleDto)
    }

    @Get("/:value")
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }
}
