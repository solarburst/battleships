import { Instance, flow, getSnapshot, types } from 'mobx-state-tree';
import { createBaseStore } from '../base-store';
import { IShot, IShotField, ShotModel } from './shots-model';
import { useStore } from '../store';
import { RequestCreator } from '../../api/request-creator';
import { LocatedShipModel } from '../../mobx/located-ships/located-ships-model';
import { storeAnnotation } from 'mobx/dist/internal';

const requestCreator = RequestCreator.getInstance();

export const ShotsStore = types
    .compose(
        types.model({}),
        createBaseStore<IShotField>(ShotModel),
    )
    .views(self => ({
        get shots() {
            const rootStore = useStore();

            const currentUserId = rootStore.gamesStore.currentUserId;

            return Array.from(self.store.values()).filter(shot => shot.userId === Number(currentUserId));
        },
        get enemyShots() {
            const rootStore = useStore();

            const currentUserId = rootStore.gamesStore.currentUserId;

            return Array.from(self.store.values()).filter(shot => shot.userId !== Number(currentUserId));
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

            console.log('GHAWOGHOAWGOAWGOHIAWOHIGOHAIW', shotInfo);

            shotInfo.shots.forEach(shot => {
                self.store.set(String(shot.id), ShotModel.create({
                    ...shot,
                    id: shot.id.toString(),
                }));
            });

            shotInfo.ships.forEach(ship => {
                console.log('setted');
                rootStore.locatedShipsStore.createModel({
                    ...ship,
                    id: ship.id.toString(),
                });
            });

            shotInfo.destroyedShips.forEach(ship => {
                console.log(rootStore.locatedShipsStore.getShips);
                rootStore.locatedShipsStore.createModel({
                    ...ship,
                    id: ship.id.toString(),
                });
            });

            // rootStore.locatedShipsStore.setShips(shotInfo.ships);

            // rootStore.locatedShipsStore.setShips(shotInfo.destroyedShips);
        }),
        fetchShots: flow(function *() {
            const shotsArr: IShot[] = yield requestCreator.getShots();

            shotsArr?.forEach(shot => {
                self.store.set(String(shot.id), ShotModel.create({
                    ...shot,
                    id: shot.id.toString(),
                }));
            });
        }),
    }));

export interface IShotsStore extends Instance<typeof ShotsStore> { }
