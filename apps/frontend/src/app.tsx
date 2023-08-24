import { HomePage } from './pages/HomePage';
import Toast from './components/Toast';
import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';
import { useStore } from './mobx/store';
import { observer } from 'mobx-react';
import { Stage } from './utils/interfaces';
import GamePage from './pages/GamePage';
import { initialShips } from './utils/constants';

const AppComponent = () => {
    const store = useStore();

    const handleOnDrop = useCallback(() => {
        if (store.locatedShipsStore.movingShip && store.gamesStore.currentGame?.stage === Stage.SETUP) {
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

    const paths = window.location.pathname.split('/');
    const gameId = paths[1];
    const userId = paths[2];

    useEffect(() => {
        const listener = (event: PromiseRejectionEvent) => {
            toast(event.reason);
        };

        window.addEventListener('unhandledrejection', listener);

        const loadGame = async () => {
            if (gameId && userId) {
                await store.gamesStore.loadGame(gameId, userId);
            }
            store.notLocatedShipsStore.setShips(initialShips);
        };

        loadGame();

        return () => window.removeEventListener('unhandledrejection', listener);
    }, []);

    if (store.gamesStore.currentGame) {
        setInterval(async () => {
            console.log('tick');
            store.gamesStore.loadGame(gameId, userId);
        }, 5000);
    }

    console.log(store.gamesStore.currentGame?.stage);

    return (
        <div onDragOver={handleDragOver} onDrop={handleOnDrop}>
            {store.gamesStore.currentGame?.stage === Stage.GAME || store.gamesStore.currentGame?.stage === Stage.OVER ? <GamePage /> : <HomePage /> }
            <Toast />
        </div>
    );
};

export const App = observer(AppComponent);
