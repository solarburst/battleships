import { Instance, flow, getSnapshot, toGeneratorFunction, types } from 'mobx-state-tree';
import { IShip } from 'utils/interfaces';
import { ILocatedShip, ILocatedShipField, LocatedShipModel } from './located-ships-model';
import { createBaseStore } from '../base-store';
import { RequestCreator } from '../../api/request-creator';
import { NotLocatedShipsStore } from 'mobx/not-located-ships/not-located-ships-store';
import { useStore } from '../store';
import { initialShips } from '../../utils/constants';
import { toast } from 'react-toastify';

const requestCreator = RequestCreator.getInstance();

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
        fetchShips: flow(function *() {
            const rootStore = useStore();

            const shipsArr: ILocatedShip[] = yield requestCreator.getShipsByUserAndGame();

            shipsArr?.forEach(ship => {
                self.store.set(String(ship.id), LocatedShipModel.create({
                    ...ship,
                    id: ship.id.toString(),
                }));

                const shipToHide = rootStore.notLocatedShipsStore.getShipByLength(ship.length);

                shipToHide.hide();
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
    }));

export interface ILocatedShipsStore extends Instance<typeof LocatedShipsStore>, IShip { }
