import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShotEntity } from './entities/shot.entity';
import { ShotDto } from './dto/shot.dto';
import { GamesService } from '../games/games.service';
import { Stage } from '../games/entities/game.entity';
import { ShipsService } from '../ships/ships.service';
import { UsersService } from '../users/users.service';
import { ShotResult } from '../utils/positionChecker';

@Injectable()
export class ShotsService {
    constructor(
        @InjectRepository(ShotEntity)
        private shotsRepository: Repository<ShotEntity>,
        @Inject(forwardRef(() => GamesService))
        private gamesService: GamesService,
        @Inject(forwardRef(() => ShipsService))
        private shipsService: ShipsService,
        private usersService: UsersService,
    ) {}

    async createShot(gameId: number, userId: number, shot: ShotDto) {
        const game = await this.gamesService.getGameById(gameId);

        const checkShot = await this.shotsRepository.findOne({ where: { x: shot.x, y: shot.y, gameId, userId } });

        if (checkShot) {
            throw new HttpException('Такой выстрел уже был', HttpStatus.BAD_REQUEST);
        }

        const isNotPlayerTurn = (userId === game.firstUserId && game.isFirstUserTurn === false)
        || (userId === game.secondUserId && game.isFirstUserTurn === true);

        if (isNotPlayerTurn) {
            throw new HttpException('Сейчас ход другого игрока', HttpStatus.BAD_REQUEST);
        }

        const enemyId = game.firstUserId === userId ? game.secondUserId : game.firstUserId;

        const enemyShips = await this.shipsService.getShipsByUserAndGame(enemyId, gameId);

        const enemy = await this.usersService.getUserById(enemyId);

        enemy.positionChecker.putShipsIntoField(enemyShips);

        const allShots = await this.getShotsByUserAndGame(userId, gameId);

        allShots.forEach(shotFromAllShots => {
            enemy.positionChecker.putShotIntoField(shotFromAllShots);
        });

        // const makeShot = await this.shotsRepository.save({
        //     ...shot,
        //     userId,
        //     gameId,
        // });

        const makeShot = {
            ...shot,
            userId,
            gameId,
        };

        const shotResult = enemy.positionChecker.putShotIntoField(makeShot);

        if (shotResult.additionalShots.length > 0) {
            for (const additionalShot of shotResult.additionalShots) {
                await this.shotsRepository.save({
                    ...additionalShot,
                    userId,
                    gameId,
                    status: ShotResult.MISS,
                });
            }
        }

        if (shotResult.status === ShotResult.MISS) {
            await this.gamesService.updateGame(gameId, {
                isFirstUserTurn: !game.isFirstUserTurn,
            });
        }
        if (enemy.positionChecker.aliveShips.length === 0) {
            this.gamesService.updateGame(gameId, {
                stage: Stage.OVER,
            });
        }

        const finalShot = await this.shotsRepository.save({
            ...shot,
            userId,
            gameId,
            status: shotResult.status,
        });

        const destroyedShips = enemy.positionChecker.destroyedShips;

        const gameInfo = await this.gamesService.getGameUserInfo(gameId, userId);

        return {
            ...gameInfo,
            destroyedShips,
        };
    }

    async getShotsByUserAndGame(userId: number, gameId: number) {
        const foundedShots = await this.shotsRepository.find({ where: { userId, gameId } });

        if (foundedShots) {
            return foundedShots;
        }
        throw new HttpException('Выстрелы не найдены', HttpStatus.NOT_FOUND);
    }

    async getShotByPosition(userId: number, gameId: number, shot: Partial<ShotDto>) {
        const foundedShot = await this.shotsRepository.find({ where: { userId, gameId, x: shot.x, y: shot.y } });

        return foundedShot;
    }

    async getShotsByGame(gameId: number) {
        const foundedShots = await this.shotsRepository.find({ where: { gameId } });

        return foundedShots;
    }
}
