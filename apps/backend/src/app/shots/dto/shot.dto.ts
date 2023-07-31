import { IsNotEmpty } from "class-validator";

export class ShotDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    gameId: number;

    @IsNotEmpty()
    x: number;

    @IsNotEmpty()
    y: number;
}