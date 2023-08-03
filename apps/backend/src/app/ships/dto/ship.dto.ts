import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Orientation } from '../entities/ship.entity';

export class ShipDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(10)
        x: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(10)
        y: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(4)
        length: number;

    @IsNotEmpty()
        orientation: Orientation;
}
