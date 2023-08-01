import { IsNotEmpty, IsNumber, Min, Max } from "class-validator";

export class ShotDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    gameId: number;

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
}