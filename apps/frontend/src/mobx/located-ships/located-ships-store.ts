import { Instance, flow, getRoot, types } from 'mobx-state-tree';
import { IShip } from 'utils/interfaces';
import { ILocatedShip, ILocatedShipField, LocatedShipModel } from './located-ships-model';
import { createBaseStore } from '../base-store';
import { RequestCreator } from '../../api/request-creator';
import { useStore } from '../store';
import { INotLocatedShip } from 'mobx/not-located-ships/not-located-ships-model';
import { IGamesStore } from 'mobx/games/games-store';

const requestCreator = RequestCreator.getInstance();

export const LocatedShipsStore = types
    .compose(
        types.model({}),
        createBaseStore<ILocatedShipField>(LocatedShipModel),
    )
    .volatile(self => ({
        movingShip: null as ILocatedShip | INotLocatedShip | null,
    }))
    .views(self => ({
        get ships() {
            const gamesStore = getRoot(self).gamesStore as IGamesStore;

            const currentUserId = gamesStore.currentUserId;

            return Array.from(self.store.values()).filter(ship => ship.userId === Number(currentUserId));
        },
        get enemyShips() {
            const gamesStore = getRoot(self).gamesStore as IGamesStore;

            const currentUserId = gamesStore.currentUserId;

            return Array.from(self.store.values()).filter(ship => ship.userId !== Number(currentUserId));
        },
    }))
    .actions(self => ({
        setMovingShip(ship: ILocatedShip | INotLocatedShip | null) {
            self.movingShip = ship;
        },
        deleteShips: flow(function *() {
            const rootStore = useStore();

            yield requestCreator.deleteShips();

            self.store.clear();

            rootStore.notLocatedShipsStore.restoreShips();
        }),
        deleteShip(id: string) {
            self.store.delete(id);
        },
        setShips(shipsArr: ILocatedShip[]) {
            shipsArr?.forEach(ship => {
                self.store.set(String(ship.id), LocatedShipModel.create({
                    ...ship,
                    id: ship.id.toString(),
                }));
            });
        },
    }));

export interface ILocatedShipsStore extends Instance<typeof LocatedShipsStore>, IShip { }
