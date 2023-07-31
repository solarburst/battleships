import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity } from './entities/game.entity';
import { GameDto } from './dto/game.dto';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(GameEntity)
        private gamesRepository: Repository<GameEntity>,
    ) {}

    async createGame(game: GameDto) {
        const newGame = await this.gamesRepository.create(game);
        await this.gamesRepository.save(newGame);
        return newGame;
    }
}
