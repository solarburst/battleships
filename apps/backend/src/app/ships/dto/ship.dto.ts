import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Orientation } from '../entities/ship.entity';
import { FIELD_SIZE } from '../../utils/constants';

export class ShipDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(FIELD_SIZE)
        x: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(FIELD_SIZE)
        y: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(4)
        length: number;

    @IsNotEmpty()
        orientation: Orientation;
}
