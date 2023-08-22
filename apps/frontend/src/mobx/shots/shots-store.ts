import { Instance, flow, getSnapshot, types } from 'mobx-state-tree';
import { createBaseStore } from '../base-store';
import { IShot, ShotModel } from './shots-model';
import { useStore } from '../store';
import { RequestCreator } from '../../api/request-creator';

const requestCreator = RequestCreator.getInstance();

export const ShotsStore = types
    .compose(
        types.model({}),
        createBaseStore<IShot>(ShotModel),
    )
    .views(self => ({
        get getShots() {
            return Array.from(self.store.values());
        },
        getShotByPosition(x: number, y: number) {
            return Array.from(self.store.values()).find(shot => shot.x === x && shot.y === y);
        },
    }))
    .actions(self => ({
        createShot: flow(function *(x: number, y: number) {
            const store = useStore();

            console.log(x, y);

            const createdShot: IShot = yield requestCreator.createShot({
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
