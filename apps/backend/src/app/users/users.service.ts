import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { generateCode } from '../utils/generateCode';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async createUser() {
        const user: UserDto = {
            code: generateCode()
        }
        const newUser = await this.usersRepository.create(user);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async getUserById(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } })
        return user
    }
}
