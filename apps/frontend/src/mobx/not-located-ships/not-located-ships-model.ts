/* eslint-disable react-hooks/rules-of-hooks */
import { Instance, flow, types } from 'mobx-state-tree';
import { IShip, Orientation } from '../../utils/interfaces';
import { useStore } from '../store';
import { ILocatedShip } from 'mobx/located-ships/located-ships-model';
import { RequestCreator } from '../../api/request-creator';

export interface INotLocatedShipField {
    id: string;
    isPlaced: boolean;
    length: number;
    orientation: Orientation;
}

const requestCreator = RequestCreator.getInstance();

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
        deleteShip() {},
        placeShip: flow(function *(x: number, y: number) {
            const store = useStore();

            const movedShip: ILocatedShip[] = yield requestCreator.placeNotLocatedShips([
                {
                    x,
                    y,
                    length: self.length,
                    orientation: self.orientation,
                },
            ]);

            movedShip.forEach(ship => {
                store.locatedShipsStore.createModel({
                    ...ship,
                    id: ship.id.toString(),
                });
            });

            self.isPlaced = true;
        }),
        hide() {
            self.isPlaced = true;
        },
        unhide() {
            self.isPlaced = false;
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

