import { HomePage } from './pages/HomePage';
import Toast from './components/Toast';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useStore } from './mobx/store';
import { RequestCreator } from './api/request-creator';
import { observer } from 'mobx-react';
import { Stage } from './utils/interfaces';
import GamePage from './pages/GamePage';

const AppComponent = () => {
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

    const paths = window.location.pathname.split('/');
    const gameId = paths[1];
    const userId = paths[2];

    useEffect(() => {
        if (gameId && userId) {
            store.gamesStore.setGame(gameId, userId);
        }
    }, []);

    return (
        <div onDragOver={handleDragOver} onDrop={handleOnDrop}>
            {store.gamesStore.getGame()?.stage === Stage.SETUP ? <HomePage /> : <GamePage />}
            <Toast />
        </div>
    );
};

export const App = observer(AppComponent);