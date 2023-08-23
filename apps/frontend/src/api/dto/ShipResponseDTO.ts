import { Orientation } from 'utils/interfaces';

export interface ShipResponseDTO {
    id: number;
    x: number;
    y: number;
    length: number;
    orientation: Orientation;
    userId: number;
}
