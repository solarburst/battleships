import { Instance, types } from 'mobx-state-tree';
import { Ship } from './models/ships';
import { IMenuShip } from 'utils/interfaces';
import { values } from 'mobx';

export const ShipsStore = types
    .model({
        ships: types.map(Ship),
        // test: types.number,
    })
    .views(self => ({
        get getShips() {
            return Array.from(self.ships.values());
        },
    }))
    .actions(self => ({
        setShips(shipsArr: IMenuShip[]) {
            console.log('set ships');

            shipsArr.forEach(ship => self.ships.set(String(ship.id), Ship.create(ship)));
        },
    }));

export interface IShipsStore extends Instance<typeof ShipsStore> { }
