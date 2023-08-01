import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post()
    async createUser() {
        return this.usersService.createUser();
    }
}
