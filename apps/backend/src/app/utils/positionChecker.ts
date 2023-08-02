import { HttpException, HttpStatus } from "@nestjs/common";
import { ShipDto } from "../ships/dto/ship.dto";
import { amountShipType } from "./amountShipType";

export class PositionChecker {
    positions: number[][]
    fieldSize: number
    shipTypes: number[]

    constructor() {
        this.positions = [];
        this.fieldSize = 9;
        this.shipTypes = [4, 3, 2, 1]

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

        ships.forEach((ship) => {
            if (ship.orientation === "horizontal") {
                if (ship.x + ship.length - 1 > this.fieldSize) {
                    throw new HttpException('Корабль за границами', HttpStatus.BAD_REQUEST);
                }
                for (let i = ship.y - 1; i <= ship.y + 1; i++) {
                    if (((ship.x - 1) >= 0) && (i >= 0) && (i <= this.fieldSize)) {
                        this.positions[i][ship.x - 1] = 1;
                    }
                    if (((ship.x + ship.length) <= this.fieldSize) && (i >= 0) && (i <= this.fieldSize)) {
                        this.positions[i][ship.x + ship.length] = 1;
                    }
                }
                for (let i = ship.x; i < ship.length + ship.x; i++) {
                    if (this.positions[ship.y][i] === 0) {
                        this.positions[ship.y][i] = 2;
                        if ((i >= 0) && (ship.y > 0)) {
							this.positions[ship.y - 1][i] = 1;
                        }
                      	if ((i <= this.fieldSize) && (ship.y + 1 < this.fieldSize)) {
                          	this.positions[ship.y + 1][i] = 1;
                        }
                    } else {
                        throw new HttpException('Корабль в пределах другого', HttpStatus.BAD_REQUEST);
                    }
                }
            }
            if (ship.orientation === "vertical") {
                if ((ship.y + ship.length - 1) > this.fieldSize) {
                    throw new HttpException('Корабль за границами', HttpStatus.BAD_REQUEST);
                }
                for (let i = ship.x - 1; i <= ship.x + 1; i++) {
                    if (((ship.y - 1) >= 0) && (i >= 0)) {
                        this.positions[ship.y - 1][i] = 1;
                    }
                    if (((ship.y + ship.length) <= this.fieldSize) && (i >= 0)) {
                        this.positions[ship.y + ship.length][i] = 1;
                    }
                }
                for (let i = ship.y; i < ship.length + ship.y; i++) {
                    if (this.positions[i][ship.x] === 0) {
                        this.positions[i][ship.x] = 2;
                      	if ((i >= 0) && (ship.x > 0)) {
							this.positions[i][ship.x - 1] = 1;
                        }
                      	if ((i <= this.fieldSize) && (ship.x + 1 < this.fieldSize)) {
                          	this.positions[i][ship.x + 1] = 1;
                        }
                    } else {
                        throw new HttpException('Корабль в пределах другого', HttpStatus.BAD_REQUEST);
                    }
                }
            }
        })

        return this.positions;
    }
}