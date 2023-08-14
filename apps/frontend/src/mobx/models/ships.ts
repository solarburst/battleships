import { Instance, types } from 'mobx-state-tree';

export enum Orientation {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export const Ship = types
    .model({
        id: types.identifierNumber,
        x: types.maybe(types.number),
        y: types.maybe(types.number),
        length: types.optional(types.number, 0),
        orientation: types.enumeration<Orientation>('Orientation', Object.values(Orientation)),
    })
    .actions(self => ({
        changeOrientation() {
            self.orientation
            = self.orientation === Orientation.Horizontal ? Orientation.Vertical : Orientation.Horizontal;
        },
        changeCoordinates(x: number, y: number) {
            self.x = x;
            self.y = y;
        },
    }))
    .views(self => ({
        get isPlaced() {
            if (self.x && self.y) {
                return self.x >= 0 && self.y >= 0;
            }

            return false;
        },
    }));

export interface IShip extends Instance<typeof Ship> { }

