import { IsNotEmpty, IsPositive, MaxLength } from 'class-validator';

export class MessageDto {
    @IsNotEmpty()
    @MaxLength(250)
        message: string;
}

export class PaginationDto {
    @IsPositive()
        offset?: number;

    @IsPositive()
        limit?: number;
}
