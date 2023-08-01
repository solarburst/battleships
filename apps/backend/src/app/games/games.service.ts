import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity, Stage } from './entities/game.entity';
import { GameDto } from './dto/game.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(GameEntity)
        private gamesRepository: Repository<GameEntity>,
        private usersService: UsersService,
    ) {}

    // async createGame(game: GameDto) {
    //     const newGame = await this.gamesRepository.create(game);
    //     await this.gamesRepository.save(newGame);
    //     return newGame;
    // }

    async createGame() {
        const firstUser = await this.usersService.createUser();
        const secondUser = await this.usersService.createUser();

        console.log('first user', firstUser);

        const game: GameDto = {
            stage: Stage.SETUP,
        }
        const newGame = await this.gamesRepository.create({
            ...game,
            firstUser: firstUser,
            secondUser: secondUser,
        });
        await this.gamesRepository.save(newGame);
        return newGame;
    }
}
