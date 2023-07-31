import { IsNotEmpty } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    gameId: number;

    @IsNotEmpty()
    message: string;
}