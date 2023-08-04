import { Orientation } from '../ships/entities/ship.entity';

export interface IPosition {
    x: number,
    y: number,
}

export interface IShipWithPosition {
    position: IPosition[];
    x: number;
    y: number;
    length: number;
    orientation: Orientation;
    hits: number;
}
