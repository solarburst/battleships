import { Orientation } from 'mobx/models/ships';

// export interface IShip {
//     id: number;
//     x?: number;
//     y?: number;
//     length: number;
//     orientation: Orientation;
//     isPlaced: boolean;
// }

export interface IMenuShip {
    id: number;
    length: number;
    orientation: Orientation;
}

export interface IShipField {
    id: number;
    x?: number;
    y?: number;
    length: number;
    orientation: Orientation;
}

