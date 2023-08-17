/* eslint-disable react-hooks/rules-of-hooks */
import { Instance, flow, getSnapshot, types } from 'mobx-state-tree';
import { IShip, Orientation } from '../../utils/interfaces';
import { useStore } from '../store';
import { ILocatedShip } from 'mobx/located-ships/located-ships-model';
import { RequestCreator } from '../../api/requestCreator';
import { toast } from 'react-toastify';

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
        placeShip: flow(function *(x: number, y: number) {
            try {
                const store = useStore();

                const movedShip: ILocatedShip[] = yield requestCreator.placeNotLocatedShip([
                    {
                        x,
                        y,
                        length: self.length,
                        orientation: self.orientation,
                    },
                ]);

                console.log('moved ship', movedShip);

                movedShip.forEach(ship => {
                    store.locatedShipsStore.createModel({
                        ...ship,
                        id: ship.id.toString(),
                    });
                });

                self.isPlaced = true;

                setTimeout(() => {
                    console.log(getSnapshot(store));

                }, 100);
            } catch (error) {
                console.error('Failed to move placed ship', error);
                toast(error.response.data.message);
            }
        }),
        hide() {
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

