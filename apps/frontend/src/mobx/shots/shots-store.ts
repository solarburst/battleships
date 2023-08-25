import { Instance, flow, getRoot, types } from 'mobx-state-tree';
import { createBaseStore } from '../base-store';
import { IShot, IShotField, ShotModel, ShotResult } from './shots-model';
import { useStore } from '../store';
import { RequestCreator } from '../../api/request-creator';
import { IGamesStore } from 'mobx/games/games-store';

const requestCreator = RequestCreator.getInstance();

export const ShotsStore = types
    .compose(
        types.model({}),
        createBaseStore<IShotField>(ShotModel),
    )
    .views(self => ({
        shots(currentUserId: number) {
            return Array.from(self.store.values()).filter(shot => shot.userId === currentUserId);
        },
        shipsDamageCount(currentUserId: number) {
            return Array.from(self.store.values()).filter(
                shot => shot.userId === currentUserId
                && (shot.status === ShotResult.HIT || shot.status === ShotResult.KILL),
            ).length;
        },
        getShotByPosition(x: number, y: number, userId: number) {
            return Array.from(self.store.values()).find(shot => shot.x === x && shot.y === y && shot.userId === userId);
        },
    }))
    .actions(self => ({
        createShot: flow(function *(x: number, y: number) {
            const rootStore = useStore();

            const shotInfo = yield requestCreator.createShot({
                x,
                y,
            });

            shotInfo.shots.forEach(shot => {
                rootStore.shotsStore.createModel({
                    ...shot,
                    id: shot.id.toString(),
                });
            });

            shotInfo.ships.forEach(ship => {
                rootStore.locatedShipsStore.createModel({
                    ...ship,
                    id: ship.id.toString(),
                });
            });

            shotInfo.destroyedShips.forEach(ship => {
                rootStore.locatedShipsStore.createModel({
                    ...ship,
                    id: ship.id.toString(),
                });
            });
        }),
        fetchShots: flow(function *() {
            const rootStore = useStore();

            const shotsArr: IShot[] = yield requestCreator.getShots();

            shotsArr?.forEach(shot => {
                rootStore.shotsStore.createModel({
                    ...shot,
                    id: shot.id.toString(),
                });
            });
        }),
    }));

export interface IShotsStore extends Instance<typeof ShotsStore> { }
