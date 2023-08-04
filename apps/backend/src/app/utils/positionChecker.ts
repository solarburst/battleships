import { HttpException, HttpStatus } from '@nestjs/common';
import { ShipDto } from '../ships/dto/ship.dto';
import { amountShipType } from './amountShipType';
import { FIELD_SIZE } from './constants';
import { ShotDto } from '../shots/dto/shot.dto';
import { Orientation } from '../ships/entities/ship.entity';
import { IShipWithPosition } from './interfaces';
import { CellType } from '../shots/entities/shot.entity';

export class PositionChecker {
    positions: number[][];
    fieldSize: number;
    shipTypes: number[];
    shipPositions: IShipWithPosition[];

    constructor() {
        this.positions = [];
        this.fieldSize = FIELD_SIZE;
        this.shipTypes = [4, 3, 2, 1];
        this.shipPositions = [];

        for (let i = 0; i <= this.fieldSize; i++) {
            this.positions[i] = new Array(this.fieldSize + 1).fill(0);
        }
    }

    putShipsIntoField(ships: ShipDto[]) {
        this.shipTypes.forEach((val, index) => {
            if (amountShipType(ships, val) > (index + 1)) {
                throw new HttpException('Неверное количество кораблей', HttpStatus.BAD_REQUEST);
            }
        });

        ships.forEach(ship => {
            const shipWithPosition = {
                ...ship,
                position: [],
                hits: 0,
            };

            if (ship.orientation === Orientation.HORIZONTAL) {
                if (ship.x + ship.length - 1 > this.fieldSize) {
                    throw new HttpException('Корабль за границами', HttpStatus.BAD_REQUEST);
                }
                for (let i = ship.y - 1; i <= ship.y + 1; i++) {
                    if (((ship.x - 1) >= 0) && (i >= 0) && (i <= this.fieldSize)) {
                        this.positions[i][ship.x - 1] = CellType.BORDER;
                    }
                    if (((ship.x + ship.length) <= this.fieldSize) && (i >= 0) && (i <= this.fieldSize)) {
                        this.positions[i][ship.x + ship.length] = CellType.BORDER;
                    }
                }
                for (let i = ship.x; i < ship.length + ship.x; i++) {
                    if (this.positions[ship.y][i] === 0) {
                        this.positions[ship.y][i] = CellType.SHIP;
                        shipWithPosition.position.push({
                            x: i,
                            y: ship.y,
                        });
                        if ((i >= 0) && (ship.y > 0)) {
                            this.positions[ship.y - 1][i] = CellType.BORDER;
                        }
                        if ((i <= this.fieldSize) && (ship.y + 1 < this.fieldSize)) {
                            this.positions[ship.y + 1][i] = CellType.BORDER;
                        }
                    } else {
                        throw new HttpException('Корабль в пределах другого', HttpStatus.BAD_REQUEST);
                    }
                }
            }
            if (ship.orientation === Orientation.VERTICAL) {
                if ((ship.y + ship.length - 1) > this.fieldSize) {
                    throw new HttpException('Корабль за границами', HttpStatus.BAD_REQUEST);
                }
                for (let i = ship.x - 1; i <= ship.x + 1; i++) {
                    if (((ship.y - 1) >= 0) && (i >= 0)) {
                        this.positions[ship.y - 1][i] = CellType.BORDER;
                    }
                    if (((ship.y + ship.length) <= this.fieldSize) && (i >= 0)) {
                        this.positions[ship.y + ship.length][i] = CellType.BORDER;
                    }
                }
                for (let i = ship.y; i < ship.length + ship.y; i++) {
                    if (this.positions[i][ship.x] === 0) {
                        this.positions[i][ship.x] = CellType.SHIP;
                        shipWithPosition.position.push({
                            x: ship.x,
                            y: i,
                        });
                        if ((i >= 0) && (ship.x > 0)) {
                            this.positions[i][ship.x - 1] = CellType.BORDER;
                        }
                        if ((i <= this.fieldSize) && (ship.x + 1 < this.fieldSize)) {
                            this.positions[i][ship.x + 1] = CellType.BORDER;
                        }
                    } else {
                        throw new HttpException('Корабль в пределах другого', HttpStatus.BAD_REQUEST);
                    }
                }
            }
            this.shipPositions.push(shipWithPosition);
        });

        return {
            positions: this.positions,
            shipPositions: this.shipPositions,
        };
    }

    putShotIntoField(shot: ShotDto) {
        const shotResult = {
            message: '',
            additionalShots: [],
        };

        if (this.positions[shot.y][shot.x] === CellType.SHIP) {
            this.positions[shot.y][shot.x] = CellType.HIT;
        } else {
            this.positions[shot.y][shot.x] = CellType.MISS;

            shotResult.message = 'miss';

            return shotResult;
        }

        for (let i = 0; i < this.shipPositions.length; i++) {
            const shipInfo = this.shipPositions[i];

            for (const elem of shipInfo.position) {
                if (elem.x !== shot.x || elem.y !== shot.y) continue;
                shipInfo.hits++;
                break;
            }

            if (shipInfo.hits < shipInfo.length) continue;

            shotResult.message = 'kill';
            shotResult.additionalShots = this.putAdditionalShots(shipInfo);

            this.shipPositions.splice(i, 1);

            return shotResult;
        }

        shotResult.message = 'hit';

        return shotResult;

        // if (this.shipPositions.length === 0) {
        //     console.log('Game over');
        // }
    }

    putAdditionalShots(shipInfo: IShipWithPosition) {
        const cellsToShot: ShotDto[] = [];

        for (let i = shipInfo.position[0].x - 1; i <= shipInfo.position[shipInfo.position.length - 1].x + 1; i++) {
            for (let j = shipInfo.position[0].y - 1; j <= shipInfo.position[shipInfo.position.length - 1].y + 1; j++) {
                if (i >= 0 && j >= 0 && i <= FIELD_SIZE && j <= FIELD_SIZE) {
                    if (this.positions[j][i] !== CellType.MISS && this.positions[j][i] !== CellType.HIT) {
                        this.positions[j][i] = CellType.MISS;
                        cellsToShot.push({
                            x: i,
                            y: j,
                        });
                    }
                }
            }
        }

        return cellsToShot;
    }
}
