import { Instance, flow, types } from 'mobx-state-tree';
import { INotLocatedShipField, NotLocatedShipModel } from './not-located-ships-model';
import { createBaseStore } from '../base-store';
import { useStore } from '../../mobx/store';
import { ILocatedShip } from '../../mobx/located-ships/located-ships-model';
import { RequestCreator } from '../../api/request-creator';

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
        getPlacedShipByLength(length: number) {
            return Array.from(self.store.values()).find(ship => ship.length === length && ship.isPlaced === true);
        },
    }))
    .actions(self => ({
        setShips(shipsArr: INotLocatedShipField[]) {
            const store = useStore();

            shipsArr.forEach(ship => self.createModel({...ship}));

            const locatedShips = store.locatedShipsStore.ships;

            locatedShips?.forEach(ship => {
                const shipToHide = store.notLocatedShipsStore.getShipByLength(ship.length);

                shipToHide.hide();
            });
        },
        restoreShips() {
            return Array.from(self.store.values()).forEach(ship => ship.isPlaced = false);
        },
        placeRandomShips: flow(function *(ships) {
            const store = useStore();

            const movedShips: ILocatedShip[] = yield requestCreator.placeNotLocatedShips(ships);

            movedShips.forEach(ship => {
                store.locatedShipsStore.createModel({
                    ...ship,
                    id: ship.id.toString(),
                });
            });

            self.store.forEach(ship => ship.isPlaced = true);
        }),
    }));

export interface INotLocatedShipsStore extends Instance<typeof NotLocatedShipsStore> { }
