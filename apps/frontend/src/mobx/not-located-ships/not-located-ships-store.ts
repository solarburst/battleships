import { Instance, types } from 'mobx-state-tree';
import { INotLocatedShip, INotLocatedShipField, NotLocatedShipModel } from './not-located-ships-model';
import { createBaseStore } from '../base-store';

export const NotLocatedShipsStore = types
    .compose(
        types.model({}),
        createBaseStore<INotLocatedShipField>(NotLocatedShipModel),
    )
    .views(self => ({
        get getShips() {
            return Array.from(self.store.values());
        },
    }))
    .actions(self => ({
        setShips(shipsArr: INotLocatedShipField[]) {
            shipsArr.forEach(ship => self.createModel(ship));
        },
        deleteShip(ship: INotLocatedShip) {
            self.store.delete(ship.id);
        },
    }));

export interface INotLocatedShipsStore extends Instance<typeof NotLocatedShipsStore> { }
