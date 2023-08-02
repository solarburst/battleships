import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity, Stage } from './entities/game.entity';
import { GameDto } from './dto/game.dto';
import { UsersService } from '../users/users.service';
import { ShipEntity } from '../ships/entities/ship.entity';
import { amountShipType } from '../utils/amountShipType';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(GameEntity)
        private gamesRepository: Repository<GameEntity>,
        private usersService: UsersService,
    ) {}

    async createGame() {
        const firstUser = await this.usersService.createUser();
        const secondUser = await this.usersService.createUser();

        const newGame = this.gamesRepository.create({
            stage: Stage.SETUP,
            firstUser: firstUser,
            secondUser: secondUser,
            isFirstUserTurn: true,
        });
        await this.gamesRepository.save(newGame);
        return {
            ...newGame,
            firstUser: firstUser.code,
            secondUser: secondUser.code
        }
    }

    async updateGame(id: number, gameDto: GameDto) {
        await this.gamesRepository.update(id, gameDto);
        const updatedGame = await this.gamesRepository.findOne({ where: { id } });
        if (updatedGame) {
            return updatedGame;
        }
        throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    async getAllGames() {
        const games = await this.gamesRepository.find({});
        return games;
    }
}
