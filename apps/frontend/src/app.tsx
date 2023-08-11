import { Main } from './components/Main';
import Header from './components/Header';
import { observer } from 'mobx-react';
import { PopupContext, PopupProvider } from './context/PopupContext';
import Popup, { PopupType } from './components/Popup';

export const AppComponent = () => {
    return (
        <PopupProvider>
            <Header />
            <Main />
            <PopupContext.Consumer>
                {() => <Popup type={PopupType.Greeting} />}
            </PopupContext.Consumer>
        </PopupProvider>
    );
};

export const App = observer(AppComponent);
