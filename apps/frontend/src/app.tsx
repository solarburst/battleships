import { Main } from './components/Main';
import Header from './components/Header';
import { observer } from 'mobx-react';
import { PopupContext, PopupProvider } from './context/PopupContext';
import PopupWrapper, { PopupType } from './components/Popup';
import PopupGreeting from './components/Popup/PopupGreeting';

export const AppComponent = () => {
    return (
        <PopupProvider>
            <Header />
            <Main />
            <PopupContext.Consumer>
                {() => <PopupWrapper type={PopupType.Greeting}><PopupGreeting /></PopupWrapper>}
            </PopupContext.Consumer>
        </PopupProvider>
    );
};

export const App = observer(AppComponent);
