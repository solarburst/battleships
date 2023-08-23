import { Injectable, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity, Stage } from './entities/game.entity';
import { GameDto } from './dto/game.dto';
import { UsersService } from '../users/users.service';
import { ShipsService } from '../ships/ships.service';
import { ShotsService } from '../shots/shots.service';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(GameEntity)
        private gamesRepository: Repository<GameEntity>,
        private usersService: UsersService,
        @Inject(forwardRef(() => ShipsService))
        private shipsService: ShipsService,
        @Inject(forwardRef(() => ShotsService))
        private shotsService: ShotsService,
    ) {}

    async createGame() {
        const firstUser = await this.usersService.createUser();
        const secondUser = await this.usersService.createUser();

        const newGame = this.gamesRepository.create({
            stage: Stage.SETUP,
            firstUser,
            secondUser,
            isFirstUserTurn: true,
            firstUserReady: false,
            secondUserReady: false,
        });

        await this.gamesRepository.save(newGame);

        return {
            id: newGame.id,
            isFirstUserTurn: newGame.isFirstUserTurn,
            stage: newGame.stage,
            // firstUser: firstUser.code,
            // secondUser: secondUser.code,
            firstUser: firstUser.id,
            secondUser: secondUser.id,
            firstUserReady: false,
            secondUserReady: false,
        };
    }

    async updateGame(id: number, gameDto: Partial<GameDto>) {
        await this.gamesRepository.update(id, gameDto);
        const updatedGame = await this.gamesRepository.findOne({ where: { id } });

        if (updatedGame) {
            return {
                ...updatedGame,
                firstUser: updatedGame.firstUser,
                secondUser: updatedGame.secondUser,
            };
        }
        throw new HttpException('Игра не найдена', HttpStatus.NOT_FOUND);
    }

    async setUserReady(gameId: number, userId: number) {
        const game = await this.gamesRepository.findOne({ where: { id: gameId } });

        if (game.firstUserId === userId) {
            await this.gamesRepository.update(gameId, { firstUserReady: !game.firstUserReady });
        }
        if (game.secondUserId === userId) {
            await this.gamesRepository.update(gameId, { secondUserReady: !game.secondUserReady });
        }

        const updatedGame = await this.gamesRepository.findOne({ where: { id: gameId } });

        if (updatedGame.firstUserReady === true && updatedGame.secondUserReady === true) {
            await this.gamesRepository.update(gameId, { stage: Stage.GAME });

            const startedGame = await this.gamesRepository.findOne({ where: { id: gameId } });

            return {
                ...startedGame,
                firstUser: startedGame.firstUser,
                secondUser: startedGame.secondUser,
            };
        }

        if (updatedGame) {
            return {
                ...updatedGame,
                firstUser: updatedGame.firstUser,
                secondUser: updatedGame.secondUser,
            };
        }

        throw new HttpException('Игра не найдена', HttpStatus.NOT_FOUND);
    }

    async getAllGames() {
        const games = await this.gamesRepository.find({});

        return games;
    }

    async getGameById(id: number) {
        const game = await this.gamesRepository.findOne({ where: { id }});

        return {
            ...game,
            firstUser: game.firstUser,
            secondUser: game.secondUser,
        };
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

        const destroyedShips = await this.shipsService.getDestroyedShips(userId, gameId);

        // const shots = await this.shotsService.getShotsByGame(gameId);

        const shots = await this.shotsService.getShotsByGame(gameId);

        return {
            gameId,
            firstUserId: game.firstUserId,
            secondUserId: game.secondUserId,
            stage: game.stage,
            isFirstUserTurn: game.isFirstUserTurn,
            firstUserReady: game.firstUserReady,
            secondUserReady: game.secondUserReady,
            ships,
            destroyedShips,
            shots,
        };
    }
}
