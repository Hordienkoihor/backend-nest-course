import {forwardRef, Module} from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Role} from "../roles/role.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Post} from "./posts.model";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule,
  ],
})
export class PostsModule {}
