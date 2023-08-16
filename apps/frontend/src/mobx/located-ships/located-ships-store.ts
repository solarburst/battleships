import { Instance, types } from 'mobx-state-tree';
import { IShip } from 'utils/interfaces';
import { ILocatedShip, ILocatedShipField, LocatedShipModel } from './located-ships-model';
import { createBaseStore } from '../base-store';

export const LocatedShipsStore = types
    .compose(
        types.model({}),
        createBaseStore<ILocatedShipField>(LocatedShipModel),
    )
    .views(self => ({
        get getShips() {
            return Array.from(self.store.values());
        },
    }))
    .actions(self => ({
        setShips(shipsArr: ILocatedShip[]) {
            shipsArr.forEach(ship => self.store.set(String(ship.id), LocatedShipModel.create(ship)));
        },

        setShip(ship: ILocatedShip) {
            self.store.set(String(ship.id), LocatedShipModel.create(ship));
        },
    }));

export interface ILocatedShipsStore extends Instance<typeof LocatedShipsStore>, IShip { }
