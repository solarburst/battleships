import { Instance, flow, getSnapshot, types } from 'mobx-state-tree';
import { createBaseStore } from '../base-store';
import { IMineShot, MineShotModel } from './mine-shots-model';
import { useStore } from '../../mobx/store';
import { RequestCreator } from '../../api/request-creator';

const requestCreator = RequestCreator.getInstance();

export const MineShotsStore = types
    .compose(
        types.model({}),
        createBaseStore<IMineShot>(MineShotModel),
    )
    .views(self => ({
        get getShots() {
            return Array.from(self.store.values());
        },
        getPlacedShipByPosition(x: number, y: number) {
            return Array.from(self.store.values()).find(shot => shot.x === x && shot.y === y);
        },
    }))
    .actions(self => ({
        createShot: flow(function *(x: number, y: number) {
            const store = useStore();

            console.log(x, y);

            const createdShot: IMineShot = yield requestCreator.createShot({
                x,
                y,
            });

            console.log('shot', createdShot);

            self.createModel({
                ...createdShot,
                id: createdShot.id.toString(),
            });

            console.log(getSnapshot(self));
        }),
        fetchShots: flow(function *() {
            const rootStore = useStore();

            const shotsArr: IMineShot[] = yield requestCreator.getShots();

            shotsArr?.forEach(shot => {
                self.store.set(String(shot.id), MineShotModel.create({
                    ...shot,
                    id: shot.id.toString(),
                }));
            });
        }),
    }));

export interface IMineShotsStore extends Instance<typeof MineShotsStore> { }
