import { Instance, types } from 'mobx-state-tree';
import { IShip, Orientation } from '../../utils/interfaces';

export interface ILocatedShipField {
    id: string;
    x: number;
    y: number;
    length: number;
    orientation: Orientation;
}

export const locatedShip = types
    .model({
        id: types.identifier,
        x: types.number,
        y: types.number,
        length: types.number,
        orientation: types.optional(types.enumeration<Orientation>('Orientation', Object.values(Orientation)), Orientation.Horizontal),
    })
    .actions(self => ({
        changeOrientation() {
            // запросы на бэк
            self.orientation
            = self.orientation === Orientation.Horizontal ? Orientation.Vertical : Orientation.Horizontal;
        },
        placeShip(x: number, y: number) {
            // запрос на бэк try catch
            console.log('located ships', x, y);
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

export interface ILocatedShip extends Instance<typeof locatedShip>, IShip { }

