import { HttpException, HttpStatus, Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipEntity } from './entities/ship.entity';
import { ShipDto } from './dto/ship.dto';
import { PositionChecker } from '../utils/positionChecker';
import { GamesService } from '../games/games.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ShipsService {
    constructor(
        @InjectRepository(ShipEntity)
        private shipsRepository: Repository<ShipEntity>,
        @Inject(forwardRef(() => GamesService))
        private gamesService: GamesService,
        private usersService: UsersService,
    ) {}

    async createShip(gameId: number, userId: number, ship: ShipDto) {
        const gameInfo = await this.gamesService.getGameUserInfo(gameId, userId);
        if (gameInfo.stage !== "setup") {
            throw new HttpException('Стадия расстановки закончилась', HttpStatus.BAD_REQUEST);
        }
        const shipsCheck: Array<ShipDto> = gameInfo.ships;
        shipsCheck.push(ship);
        const user = await this.usersService.getUserById(userId);
        user.positionChecker.putShipsIntoField(shipsCheck);
        console.log(user.positionChecker.positions)
        const newShip = this.shipsRepository.create({
            ...ship,
            userId,
            gameId
        });
        await this.shipsRepository.save(newShip);
        return newShip;
    }

    async getShipsByGame(gameId: number) {
        const gameShips = await this.shipsRepository.find({ where: { gameId }});
        return gameShips;
    }

    async getShipsByUserAndGame(userId: number, gameId: number) {
        const foundedShips = await this.shipsRepository.find({ where: { userId, gameId } })
        return foundedShips;
    }
}
