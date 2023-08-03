import { IsNotEmpty, MaxLength } from 'class-validator';

export class MessageDto {
    @IsNotEmpty()
        userId: number;

    @IsNotEmpty()
        gameId: number;

    @IsNotEmpty()
    @MaxLength(250)
        message: string;
}
