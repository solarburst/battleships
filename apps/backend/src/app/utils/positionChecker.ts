import { HttpException, HttpStatus } from '@nestjs/common';
import { ShipDto } from '../ships/dto/ship.dto';
import { amountShipType } from './amountShipType';
import { FIELD_SIZE } from './constants';
import { ShotDto } from '../shots/dto/shot.dto';
import { Orientation } from '../ships/entities/ship.entity';
import { IShipWithPosition } from './interfaces';

export enum CellType {
    EMPTY = 0,
    SHIP_PLACEHOLDER = 1,
    SHIP = 2,
    MISS = 3,
    HIT = 4
}

export enum ShotResult {
    KILL = 'kill',
    HIT = 'hit',
    MISS = 'miss'
}

export class PositionChecker {
    positions: number[][];
    fieldSize: number;
    shipTypes: number[];
    aliveShips: IShipWithPosition[];
    destroyedShips: IShipWithPosition[];

    constructor() {
        this.positions = [];
        this.fieldSize = FIELD_SIZE;
        this.shipTypes = [4, 3, 2, 1];
        this.aliveShips = [];
        this.destroyedShips = [];

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
                        this.positions[i][ship.x - 1] = CellType.SHIP_PLACEHOLDER;
                    }
                    if (((ship.x + ship.length) <= this.fieldSize) && (i >= 0) && (i <= this.fieldSize)) {
                        this.positions[i][ship.x + ship.length] = CellType.SHIP_PLACEHOLDER;
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
                            this.positions[ship.y - 1][i] = CellType.SHIP_PLACEHOLDER;
                        }
                        if ((i <= this.fieldSize) && (ship.y + 1 < this.fieldSize)) {
                            this.positions[ship.y + 1][i] = CellType.SHIP_PLACEHOLDER;
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
                        this.positions[ship.y - 1][i] = CellType.SHIP_PLACEHOLDER;
                    }
                    if (((ship.y + ship.length) <= this.fieldSize) && (i >= 0)) {
                        this.positions[ship.y + ship.length][i] = CellType.SHIP_PLACEHOLDER;
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
                            this.positions[i][ship.x - 1] = CellType.SHIP_PLACEHOLDER;
                        }
                        if ((i <= this.fieldSize) && (ship.x + 1 < this.fieldSize)) {
                            this.positions[i][ship.x + 1] = CellType.SHIP_PLACEHOLDER;
                        }
                    } else {
                        throw new HttpException('Корабль в пределах другого', HttpStatus.BAD_REQUEST);
                    }
                }
            }
            this.aliveShips.push(shipWithPosition);
        });
    }

    putShotIntoField(shot: ShotDto) {
        const shotResult = {
            status: ShotResult.MISS,
            additionalShots: [],
        };

        if (this.positions[shot.y][shot.x] === CellType.SHIP) {
            this.positions[shot.y][shot.x] = CellType.HIT;
        } else {
            this.positions[shot.y][shot.x] = CellType.MISS;

            shotResult.status = ShotResult.MISS;

            return shotResult;
        }

        for (let i = 0; i < this.aliveShips.length; i++) {
            const shipInfo = this.aliveShips[i];

            for (const elem of shipInfo.position) {
                if (elem.x === shot.x && elem.y === shot.y) {
                    shipInfo.hits++;
                    break;
                }
            }

            if (shipInfo.hits < shipInfo.length) continue;

            shotResult.status = ShotResult.KILL;
            shotResult.additionalShots = this.putAdditionalShots(shipInfo);

            this.destroyedShips.push(shipInfo);
            this.aliveShips.splice(i, 1);

            return shotResult;
        }

        shotResult.status = ShotResult.HIT;

        return shotResult;
    }

    putAdditionalShots(shipInfo: IShipWithPosition) {
        const cellsToShot: ShotDto[] = [];

        for (let i = shipInfo.position[0].x - 1; i <= shipInfo.position[shipInfo.position.length - 1].x + 1; i++) {
            for (let j = shipInfo.position[0].y - 1; j <= shipInfo.position[shipInfo.position.length - 1].y + 1; j++) {
                const isInField = i >= 0 && j >= 0 && i <= FIELD_SIZE && j <= FIELD_SIZE;
                const isPositionEmpty = isInField
                    ? this.positions[j][i] !== CellType.MISS && this.positions[j][i] !== CellType.HIT
                    : null;

                if (isPositionEmpty) {
                    this.positions[j][i] = CellType.MISS;
                    cellsToShot.push({
                        x: i,
                        y: j,
                    });
                }
            }
        }

        return cellsToShot;
    }
}
