import { HttpException, HttpStatus, Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipEntity } from './entities/ship.entity';
import { ShipDto } from './dto/ship.dto';
import { PositionChecker } from '../utils/positionChecker';
import { GamesService } from '../games/games.service';
import { UsersService } from '../users/users.service';
import { Stage } from '../games/entities/game.entity';

@Injectable()
export class ShipsService {
    constructor(
        @InjectRepository(ShipEntity)
        private shipsRepository: Repository<ShipEntity>,
        @Inject(forwardRef(() => GamesService))
        private gamesService: GamesService,
        private usersService: UsersService,
    ) {}

    async createShip(gameId: number, userId: number, ships: ShipDto[]) {
        const gameInfo = await this.gamesService.getGameUserInfo(gameId, userId);
        if (gameInfo.stage !== Stage.SETUP) {
            throw new HttpException('Стадия расстановки закончилась', HttpStatus.BAD_REQUEST);
        }
        const shipsInGame: ShipDto[] = gameInfo.ships;
        const shipsCheck = shipsInGame.concat(ships);
        const user = await this.usersService.getUserById(userId);
        user.positionChecker.putShipsIntoField(shipsCheck);
        console.log(user.positionChecker.positions)
        const newShips: ShipEntity[] = [];
        ships.forEach(async (ship) => {
            const newShip = this.shipsRepository.create({
                ...ship,
                userId,
                gameId
            });
            newShips.push(newShip);
            await this.shipsRepository.save(newShip);
        })
        return newShips;
    }

    async moveShip(gameId: number, userId: number, shipId: number, shipInfo: ShipDto) {
        const gameInfo = await this.gamesService.getGameUserInfo(gameId, userId);
        if (gameInfo.stage !== Stage.SETUP) {
            throw new HttpException('Стадия расстановки закончилась', HttpStatus.BAD_REQUEST);
        }
        if (!gameInfo.ships.find(item => item.id === shipId)) {
            throw new HttpException('Корабль не найден', HttpStatus.NOT_FOUND);
        }
        const foundedShip = await this.shipsRepository.findOne({ where: { id: shipId } })
        const updatedShip = {
            ...foundedShip,
            ...shipInfo
        }
        const index = gameInfo.ships.findIndex(item => item.id === foundedShip.id);
        gameInfo.ships.splice(index, 1);
        gameInfo.ships.push(updatedShip);
        const user = await this.usersService.getUserById(userId);
        user.positionChecker.putShipsIntoField(gameInfo.ships);
        this.shipsRepository.update(shipId, shipInfo);
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
