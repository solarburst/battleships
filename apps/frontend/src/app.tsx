import { HomePage } from './pages/HomePage';
import Toast from './components/Toast';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useStore } from './mobx/store';

export const App = () => {
    const store = useStore();

    const handleOnDrop = () => {
        if (store.locatedShipsStore.movingShip) {
            store.locatedShipsStore.movingShip.deleteShip();
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

    return (
        <div onDragOver={handleDragOver} onDrop={handleOnDrop}>
            <HomePage />
            <Toast />
        </div>
    );
};
