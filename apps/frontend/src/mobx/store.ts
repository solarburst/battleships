import { Instance, types } from 'mobx-state-tree';
import { LocatedShipsStore } from './located-ships/located-ships-store';
import { NotLocatedShipsStore } from './not-located-ships/not-located-ships-store';

const RootStore = types
    .model({
        locatedShipsStore: types.optional(LocatedShipsStore, {}),
        notLocatedShipsStore: types.optional(NotLocatedShipsStore, {}),
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
