import { IsNotEmpty } from "class-validator";
import { Orientation } from "../entities/ship.entity";

export class ShipDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    gameId: number;

    @IsNotEmpty()
    x: number;

    @IsNotEmpty()
    y: number;

    @IsNotEmpty()
    length: number;

    @IsNotEmpty()
    orientation: Orientation;
}