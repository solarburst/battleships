import { HttpException, HttpStatus } from '@nestjs/common';
import { ShotDto } from '../shots/dto/shot.dto';

export class HitChecker {
    positions: number[][];
    fieldSize: number;

    constructor(positions: number[][]) {
        this.positions = positions;
        this.fieldSize = 9;
    }

    checkHit(shot: ShotDto) {
        if ((shot.x > this.fieldSize || shot.y > this.fieldSize) || (shot.x < 0 || shot.y < 0)) {
            throw new HttpException('Выстрел вне поля', HttpStatus.BAD_REQUEST);
        }
        if (this.positions[shot.y][shot.x] === 2) {
            return true;
        }

        return false;
    }
}
