import { Instance, types } from 'mobx-state-tree';
import { INotLocatedShip, INotLocatedShipField, NotLocatedShipModel } from './not-located-ships-model';
import { createBaseStore } from '../base-store';
import { RequestCreator } from '../../api/requestCreator';

const requestCreator = RequestCreator.getInstance();

export const NotLocatedShipsStore = types
    .compose(
        types.model({}),
        createBaseStore<INotLocatedShipField>(NotLocatedShipModel),
    )
    .views(self => ({
        get getShips() {
            return Array.from(self.store.values());
        },
        getShipById(id: string) {
            return Array.from(self.store.values()).find(ship => ship.id === id && ship.isPlaced === false);
        },
        getShipByLength(length: number) {
            return Array.from(self.store.values()).find(ship => ship.length === length && ship.isPlaced === false);
        },
    }))
    .actions(self => ({
        setShips(shipsArr: INotLocatedShipField[]) {
            shipsArr.forEach(ship => self.createModel({...ship}));
        },
    }));

export interface INotLocatedShipsStore extends Instance<typeof NotLocatedShipsStore> { }
