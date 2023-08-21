import { HomePage } from './pages/HomePage';
import Toast from './components/Toast';
import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';
import { useStore } from './mobx/store';
import { observer } from 'mobx-react';
import { Stage } from './utils/interfaces';
import GamePage from './pages/GamePage';

const AppComponent = () => {
    const store = useStore();

    const handleOnDrop = useCallback(() => {
        if (store.locatedShipsStore.movingShip) {
            store.locatedShipsStore.movingShip.deleteShip();

            const userInfo = store.gamesStore.getUserInfo(Number(store.gamesStore.currentUserId));

            if (userInfo.id && userInfo.ready === true) {
                store.gamesStore.setReady(userInfo.id);
            }
        }
        store.locatedShipsStore.setMovingShip(null);
    }, []);

    const handleDragOver = (event: React.DragEvent<Element>) => {
        event.preventDefault();
    };

    useEffect(() => {
        const listener = (event: PromiseRejectionEvent) => {
            toast(event.reason);
        };

        window.addEventListener('unhandledrejection', listener);

        const paths = window.location.pathname.split('/');
        const gameId = paths[1];
        const userId = paths[2];

        if (gameId && userId) {
            store.gamesStore.loadGame(gameId, userId);
        }

        return () => window.removeEventListener('unhandledrejection', listener);
    }, []);

    return (
        <div onDragOver={handleDragOver} onDrop={handleOnDrop}>
            {store.gamesStore.currentGame?.stage === Stage.GAME ? <GamePage /> : <HomePage />}
            <Toast />
        </div>
    );
};

export const App = observer(AppComponent);
