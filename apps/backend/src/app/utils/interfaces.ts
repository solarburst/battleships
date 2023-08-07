import { ShipDto } from '../ships/dto/ship.dto';
import { Orientation } from '../ships/entities/ship.entity';

export interface IPosition {
    x: number,
    y: number,
}

export interface IShipWithPosition extends ShipDto {
    position: IPosition[];
    hits: number;
}
