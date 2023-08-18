import { HomePage } from './pages/HomePage';
import Toast from './components/Toast';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const App = () => {
    useEffect(() => {
        window.addEventListener('unhandledrejection', (event) => {
            toast(event.reason);
        });

        return () => window.addEventListener('unhandledrejection', (event) => {
            toast(event.reason);
        });
    }, []);

    return (
        <>
            <HomePage />
            <Toast />
        </>
    );
};
