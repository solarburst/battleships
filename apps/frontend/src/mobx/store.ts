import { Instance, types } from 'mobx-state-tree';
import { ShipsStore } from './ships-store';

const RootStore = types
    .model({
        shipsStore: types.optional(ShipsStore, {}),
    });

export interface IRootStore extends Instance<typeof RootStore> { }

export class RootStoreCreator {
    private static instance: IRootStore | null = null;

    private constructor() {}

    public static getInstance() {
        if (!RootStoreCreator.instance) {
            RootStoreCreator.instance = RootStore.create({});
        }

        return RootStoreCreator.instance;
    }
}

export const useStore = () => {
    return RootStoreCreator.getInstance();
};
