/* eslint-disable react-hooks/rules-of-hooks */
import { Instance, types } from 'mobx-state-tree';
import { IShip, Orientation } from '../../utils/interfaces';
import { useStore } from '../store';

export interface INotLocatedShipField {
    id: string;
    isPlaced: boolean;
    length: number;
    orientation: Orientation;
}

export const NotLocatedShipModel = types
    .model({
        id: types.identifier,
        isPlaced: types.optional(types.boolean, false),
        length: types.optional(types.number, 0),
        orientation: types.optional(
            types.enumeration<Orientation>('Orientation', Object.values(Orientation)),
            Orientation.Horizontal,
        ),
    })
    .actions(self => ({
        changeOrientation() {},
        placeShip(x: number, y: number) {
            // запрос на бэк try catch (orientation horizontal)
            // locatedShip.create({ /* объект из запроса */ });
            const store = useStore();

            store.locatedShipsStore.createModel({
                id: self.id,
                x,
                y,
                length: self.length,
                orientation: self.orientation,
            });
            self.isPlaced = true;
        },
    }))
    .views(self => ({
        get x() {
            return null;
        },
        get y() {
            return null;
        },
    }));

export interface INotLocatedShip extends Instance<typeof NotLocatedShipModel>, IShip, INotLocatedShipField { }

