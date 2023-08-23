import { Instance, flow, types } from 'mobx-state-tree';
import { IShip } from 'utils/interfaces';
import { ILocatedShip, ILocatedShipField, LocatedShipModel } from './located-ships-model';
import { createBaseStore } from '../base-store';
import { RequestCreator } from '../../api/request-creator';
import { useStore } from '../store';
import { INotLocatedShip } from 'mobx/not-located-ships/not-located-ships-model';

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
            const rootStore = useStore();

            const currentUserId = rootStore.gamesStore.currentUserId;

            return Array.from(self.store.values()).filter(ship => ship.userId === Number(currentUserId));
        },
        get enemyShips() {
            const rootStore = useStore();

            const currentUserId = rootStore.gamesStore.currentUserId;

            return Array.from(self.store.values()).filter(ship => ship.userId !== Number(currentUserId));
        },
    }))
    .actions(self => ({
        setMovingShip(ship: ILocatedShip | INotLocatedShip | null) {
            self.movingShip = ship;
        },
        fetchShips: flow(function *() {
            const rootStore = useStore();

            const shipsArr: ILocatedShip[] = yield requestCreator.getShipsByUserAndGame();

            const destroyedshipsArr: ILocatedShip[] = yield requestCreator.getDestroyedShips();

            shipsArr?.forEach(ship => {
                self.store.set(String(ship.id), LocatedShipModel.create({
                    ...ship,
                    id: ship.id.toString(),
                }));

                const shipToHide = rootStore.notLocatedShipsStore.getShipByLength(ship.length);

                shipToHide.hide();
            });

            destroyedshipsArr?.forEach(ship => {
                self.store.set(String(ship.id), LocatedShipModel.create({
                    ...ship,
                    id: ship.id.toString(),
                }));
            });
        }),
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
