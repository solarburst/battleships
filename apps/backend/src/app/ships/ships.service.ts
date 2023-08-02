import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipEntity } from './entities/ship.entity';
import { ShipDto } from './dto/ship.dto';
import { GamesService } from '../games/games.service';
import { amountShipType } from '../utils/amountShipType';

@Injectable()
export class ShipsService {
    constructor(
        @InjectRepository(ShipEntity)
        private shipsRepository: Repository<ShipEntity>,
        private gamesService: GamesService,
    ) {}

    async createShip(ship: ShipDto) {
        const newShip = await this.shipsRepository.create(ship);
        await this.shipsRepository.save(newShip);
        const ships = await this.getShipsByUserAndGame(ship.userId, ship.gameId);
        try {
            await this.getFilledField(ships);
        } catch (error) {
            this.shipsRepository.delete(newShip.id);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
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

    async getFilledField(ships: ShipEntity[]) {
        const fieldSize = 9;

        const positions: number[][] = [];
        for (let i = 0; i <= fieldSize; i++) {
            positions[i] = new Array(10).fill(0);
        }

        const shipTypes = [4, 3, 2, 1]

        shipTypes.forEach((val, index) => {
            if (amountShipType(ships, val) > (index + 1)) {
                throw new BadRequestException('Неверное количество кораблей');
            }
        });

        ships.forEach((ship) => {
            if (ship.orientation === "horizontal") {
                if (ship.x + ship.length - 1 > fieldSize) {
                    throw new HttpException('Корабль за границами', HttpStatus.BAD_REQUEST);
                }
                for (let i = ship.y - 1; i <= ship.y + 1; i++) {
                    if (((ship.x - 1) >= 0) && (i >= 0) && (i <= fieldSize)) {
                        positions[i][ship.x - 1] = 1;
                    }
                    if (((ship.x + ship.length) <= fieldSize) && (i >= 0) && (i <= fieldSize)) {
                        positions[i][ship.x + ship.length] = 1;
                    }
                }
                for (let i = ship.x; i < ship.length + ship.x; i++) {
                    if (positions[ship.y][i] === 0) {
                        positions[ship.y][i] = 2;
                        if ((i >= 0) && (ship.y > 0)) {
							positions[ship.y - 1][i] = 1;
                        }
                      	if ((i <= fieldSize) && (ship.y + 1 < fieldSize)) {
                          	positions[ship.y + 1][i] = 1;
                        }
                    } else {
                        throw new HttpException('Корабль в пределах другого', HttpStatus.BAD_REQUEST);
                    }
                }
            }
            if (ship.orientation === "vertical") {
                if ((ship.y + ship.length - 1) > fieldSize) {
                    throw new HttpException('Корабль за границами', HttpStatus.BAD_REQUEST);
                }
                for (let i = ship.x - 1; i <= ship.x + 1; i++) {
                    if (((ship.y - 1) >= 0) && (i >= 0) && (i <= fieldSize)) {
                        positions[ship.y - 1][i] = 1;
                    }
                    if (((ship.y + ship.length) <= fieldSize) && (i >= 0) && (i <= fieldSize)) {
                        positions[ship.y + ship.length][i] = 1;
                    }
                }
                for (let i = ship.y; i < ship.length + ship.y; i++) {
                    if (positions[i][ship.x] === 0) {
                        positions[i][ship.x] = 2;
                      	if ((i >= 0) && (ship.x > 0)) {
							positions[i][ship.x - 1] = 1;
                        }
                      	if ((i <= fieldSize) && (ship.x + 1 < fieldSize)) {
                          	positions[i][ship.x + 1] = 1;
                        }
                    } else {
                        throw new HttpException('Корабль в пределах другого', HttpStatus.BAD_REQUEST);
                    }
                }
            }
        })

        return positions;
    }
}
