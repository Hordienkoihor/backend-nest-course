import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bc from "bcryptjs";
import {User} from "../users/user.model";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
    }

    async register(userDto: CreateUserDto) {
        const potentialExistingUser = await this.userService.getUserByEmail(userDto.email);

        if (potentialExistingUser) {
            throw new HttpException("User already exist", HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bc.hash(userDto.password, 5);
        const user = await this.userService.createUser({
            ...userDto, password: hashPassword
        });

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);

        if (!user) {
            throw new HttpException("email does not exists", HttpStatus.BAD_REQUEST);
        }

        console.log(userDto.password)
        console.log(user.password);
        console.log(user.getDataValue("password"));

        const passwordEquals = await bc.compare(userDto.password, user.getDataValue("password"));

        if (passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: 'Invalid email and password pair'});
    }
}
