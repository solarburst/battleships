import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShotEntity } from './entities/shot.entity';
import { ShotDto } from './dto/shot.dto';
import { GamesService } from '../games/games.service';
import { Stage } from '../games/entities/game.entity';
import { ShipsService } from '../ships/ships.service';
import { UsersService } from '../users/users.service';
import { HitChecker } from '../utils/hitChecker';

@Injectable()
export class ShotsService {
    constructor(
        @InjectRepository(ShotEntity)
        private shotsRepository: Repository<ShotEntity>,
        private gamesService: GamesService,
        private shipsService: ShipsService,
        private usersService: UsersService,
    ) {}

    async createShot(gameId: number, userId: number, shot: ShotDto) {
        const game = await this.gamesService.getGameById(gameId);
        let enemyId;

        if (game.stage !== Stage.GAME) {
            throw new HttpException('Стадия игры не началась', HttpStatus.BAD_REQUEST);
        }

        if (game.firstUserId === userId) {
            enemyId = game.secondUserId;
        } else {
            enemyId = game.firstUserId;
        }

        const enemyShips = await this.shipsService.getShipsByUserAndGame(enemyId, gameId);

        const enemy = await this.usersService.getUserById(enemyId);

        enemy.positionChecker.putShipsIntoField(enemyShips);
        const checkShot = await this.shotsRepository.findOne({ where: { x: shot.x, y: shot.y } });

        if (checkShot) {
            throw new HttpException('Такой выстрел уже был', HttpStatus.BAD_REQUEST);
        }

        const makeShot = await this.shotsRepository.create({
            ...shot,
            userId,
            gameId,
        });

        await this.shotsRepository.save(makeShot);

        const hitChecker = new HitChecker(enemy.positionChecker.positions);

        if (hitChecker.checkHit(makeShot)) {
            console.log('Попадание');
        } else {
            await this.gamesService.updateGame(gameId, {
                stage: Stage.GAME,
                userTurn: !game.userTurn,
            });
        }

        return makeShot;
    }

    async getShotsByUserAndGame(userId: number, gameId: number) {
        const foundedShots = await this.shotsRepository.find({ where: { userId, gameId } });

        if (foundedShots) {
            return foundedShots;
        }
        throw new HttpException('Выстрелы не найдены', HttpStatus.NOT_FOUND);
    }
}
