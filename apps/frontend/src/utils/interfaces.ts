export enum Orientation {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export enum Stage {
    SETUP = 'setup',
    GAME = 'game',
    OVER = 'over',
}

export enum FieldOwner {
    ME = 'me',
    ENEMY = 'enemy',
}

export interface IShip {
    placeShip(x: number, y: number): void;
    changeOrientation(): void;
}

