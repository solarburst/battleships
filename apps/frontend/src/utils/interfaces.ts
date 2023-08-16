export enum Orientation {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export interface IShip {
    placeShip(x: number, y: number): void;
    changeOrientation(): void;
}

