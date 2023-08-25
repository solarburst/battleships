import { Main } from '../../components/Main';
import Header from '../../components/Header';
import { PopupContext, PopupProvider } from '../../context/PopupContext';
import PopupWrapper, { PopupType } from '../../components/Popup';
import PopupGreeting from '../../components/Popup/PopupGreeting';
import { BASE_URL } from '../../utils/constants';

export const HomePage = () => {
    return (
        <PopupProvider>
            <Header />
            <Main />
            {
                (window.location.href === BASE_URL)
                    ? <PopupContext.Consumer>
                        {() => <PopupWrapper type={PopupType.Greeting}><PopupGreeting /></PopupWrapper>}
                    </PopupContext.Consumer>
                    : <></>
            }
        </PopupProvider>
    );
};
