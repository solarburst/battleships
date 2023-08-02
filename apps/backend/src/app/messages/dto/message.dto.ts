import { IsNotEmpty, MaxLength } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    gameId: number;

    @IsNotEmpty()
    @MaxLength(100)
    message: string;
}