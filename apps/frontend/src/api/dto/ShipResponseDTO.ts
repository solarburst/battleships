import { Orientation } from 'mobx/models/ships';

export interface ShipResponseDTO {
    id: number;
    x: number;
    y: number;
    length: number;
    orientation: Orientation;
}
