import { Injectable, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity, Stage } from './entities/game.entity';
import { GameDto } from './dto/game.dto';
import { UsersService } from '../users/users.service';
import { ShipsService } from '../ships/ships.service';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(GameEntity)
        private gamesRepository: Repository<GameEntity>,
        private usersService: UsersService,
        @Inject(forwardRef(() => ShipsService))
        private shipsService: ShipsService,
    ) {}

    async createGame() {
        const firstUser = await this.usersService.createUser();
        const secondUser = await this.usersService.createUser();

        const newGame = this.gamesRepository.create({
            stage: Stage.SETUP,
            firstUser,
            secondUser,
            isFirstUserTurn: true,
        });

        await this.gamesRepository.save(newGame);

        return {
            id: newGame.id,
            isFirstUserTurn: newGame.isFirstUserTurn,
            stage: newGame.stage,
            firstUser: firstUser.code,
            secondUser: secondUser.code,
        };
    }

    async updateGame(id: number, gameDto: GameDto) {
        await this.gamesRepository.update(id, gameDto);
        const updatedGame = await this.gamesRepository.findOne({ where: { id } });

        if (updatedGame) {
            return updatedGame;
        }
        throw new HttpException('Игра не найдена', HttpStatus.NOT_FOUND);
    }

    async getAllGames() {
        const games = await this.gamesRepository.find({});

        return games;
    }

    async getGameById(id: number) {
        const game = await this.gamesRepository.findOne({ where: { id }});

        return game;
    }

    async getGameUserInfo(gameId: number, userId: number) {
        const game = await this.gamesRepository.findOne({ where: [
            { id: gameId, firstUserId: userId },
            { id: gameId, secondUserId: userId },
        ]});

        if (!game) {
            throw new HttpException('Игра не найдена', HttpStatus.NOT_FOUND);
        }
        const ships = await this.shipsService.getShipsByUserAndGame(userId, gameId);

        return {
            gameId,
            userId,
            stage: game.stage,
            isFirstUserTurn: game.isFirstUserTurn,
            ships: [...ships],
        };
    }
}
