import { IsNotEmpty, MaxLength } from 'class-validator';

export class MessageDto {
    @IsNotEmpty()
    @MaxLength(250)
        message: string;
}
