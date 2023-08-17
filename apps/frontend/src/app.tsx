import { observer } from 'mobx-react';
import { HomePage } from './pages/HomePage';

export const AppComponent = () => {
    return (
        <HomePage />
    );
};

export const App = observer(AppComponent);
