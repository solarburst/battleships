import { ShipDto } from '../ships/dto/ship.dto';

export interface IPosition {
    x: number,
    y: number,
}

export interface IShipWithPosition extends ShipDto {
    position: IPosition[];
    hits: number;
}
