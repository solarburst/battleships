import { RootStoreCreator } from '../mobx/store';

export const useStore = () => {
    return RootStoreCreator.getInstance();
};
