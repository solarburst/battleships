// export interface IShip {
//     id: number;
//     x?: number;
//     y?: number;
//     length: number;
//     orientation: Orientation;
//     isPlaced: boolean;
// }

export enum Orientation {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export interface IMenuShip {
    id: number;
    length: number;
    orientation: Orientation;
}

export interface IShip {
    placeShip(x: number, y: number): void;
    changeOrientation(): void;
}

