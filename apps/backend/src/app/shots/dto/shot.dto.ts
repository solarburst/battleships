import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { FIELD_SIZE } from '../../utils/constants';

export class ShotDto {
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
}
