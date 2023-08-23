import { FIELD_SIZE, initialShips } from './constants';
import { Orientation } from './interfaces';

interface IShipCoordinates {
    orientation: Orientation;
    x: number;
    y: number;
    length: number;
}

export class PositionChecker {
    shipsToSend: IShipCoordinates[];

    constructor() {
        this.shipsToSend = [];
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * (max + 1));
    }

    checkCoordinates(coordinates: IShipCoordinates, length: number, positions: number[][]) {
        const fromY = coordinates.y === 0 ? coordinates.y : coordinates.y - 1;
        let toY;

        if (coordinates.orientation === Orientation.Vertical && coordinates.y + length - 1 === FIELD_SIZE) {
            toY = coordinates.y + length - 1;
        } else if (coordinates.orientation === Orientation.Vertical && coordinates.y + length - 1 < FIELD_SIZE) {
            toY = coordinates.y + length;
        } else if (coordinates.orientation === Orientation.Horizontal && coordinates.y === FIELD_SIZE) {
            toY = coordinates.y;
        } else if (coordinates.orientation === Orientation.Horizontal && coordinates.y < FIELD_SIZE) {
            toY = coordinates.y + 1;
        }

        const fromX = coordinates.x === 0 ? coordinates.x : coordinates.x - 1;
        let toX;

        if (coordinates.orientation === Orientation.Horizontal && coordinates.x + length - 1 === FIELD_SIZE) {
            toX = coordinates.x + length - 1;
        } else if (coordinates.orientation === Orientation.Horizontal && coordinates.x + length - 1 < FIELD_SIZE) {
            toX = coordinates.x + length;
        } else if (coordinates.orientation === Orientation.Vertical && coordinates.x === FIELD_SIZE) {
            toX = coordinates.x;
        } else if (coordinates.orientation === Orientation.Vertical && coordinates.x < FIELD_SIZE) {
            toX = coordinates.x + 1;
        }

        if (toX === undefined || toY === undefined) {
            return false;
        }

        if (positions.slice(fromY, toY + 1)
            .filter(arr => arr.slice(fromX, toX + 1).includes(1))
            .length > 0) {
            return false;
        }

        return true;
    }

    getRandomCoordinates(length: number, positions: number[][]): boolean {
        const orientation = this.getRandomInt(1) ? Orientation.Horizontal : Orientation.Vertical;

        let x, y;

        if (orientation === Orientation.Horizontal) {
            x = this.getRandomInt(FIELD_SIZE);
            y = this.getRandomInt(FIELD_SIZE - length + 1);
        } else {
            x = this.getRandomInt(FIELD_SIZE - length + 1);
            y = this.getRandomInt(FIELD_SIZE);
        }

        const coordinates = {
            orientation,
            x,
            y,
            length,
        };

        const result = this.checkCoordinates(coordinates, length, positions);

        if (!result) {
            return this.getRandomCoordinates(length, positions);
        }

        for (let i = 0; i < length; i++) {
            if (coordinates.orientation === Orientation.Vertical) {
                positions[y + i][x] = 1;
            }
            if (coordinates.orientation === Orientation.Horizontal) {
                positions[y][x + i] = 1;
            }
        }

        this.shipsToSend.push(coordinates);

        return result;
    }

    randomizeShipsLocation() {
        const positions: number[][] = [];

        for (let i = 0; i <= FIELD_SIZE; i++) {
            positions[i] = new Array(FIELD_SIZE + 1).fill(0);
        }

        for (const ship of initialShips) {
            const length = ship.length;

            this.getRandomCoordinates(length, positions);
        }
    }
}
