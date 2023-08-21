import { HomePage } from './pages/HomePage';
import Toast from './components/Toast';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useStore } from './mobx/store';
import { getSnapshot } from 'mobx-state-tree';
import { RequestCreator } from './api/request-creator';
import { initialShips } from './utils/constants';

export const App = () => {
    const store = useStore();

    const requestCreator = RequestCreator.getInstance();

    const handleOnDrop = () => {
        if (store.locatedShipsStore.movingShip) {
            store.locatedShipsStore.movingShip.deleteShip();

            const userInfo = store.gamesStore.getUserInfo(requestCreator.userId);

            if (userInfo.id && userInfo.ready === true) {
                store.gamesStore.setReady(userInfo.id);
            }
        }
        store.locatedShipsStore.setMovingShip(null);
    };

    const handleDragOver = (event: React.DragEvent<Element>) => {
        event.preventDefault();
    };

    useEffect(() => {
        const listener = (event: PromiseRejectionEvent) => {
            toast(event.reason);
        };

        window.addEventListener('unhandledrejection', listener);

        return () => window.removeEventListener('unhandledrejection', listener);
    }, []);

    useEffect(() => {
        store.notLocatedShipsStore.setShips(initialShips);
        store.locatedShipsStore.fetchShips();
    }, []);

    return (
        <div onDragOver={handleDragOver} onDrop={handleOnDrop}>
            <HomePage />
            <Toast />
        </div>
    );
};
