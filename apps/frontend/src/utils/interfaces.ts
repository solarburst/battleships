export enum Orientation {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export enum Stage {
    SETUP = 'setup',
    GAME = 'game',
    OVER = 'over'
}

export interface IShip {
    placeShip(x: number, y: number): void;
    changeOrientation(): void;
}

