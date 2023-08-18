import { Main } from '../../components/Main';
import Header from '../../components/Header';
import { observer } from 'mobx-react';
import { PopupContext, PopupProvider } from '../../context/PopupContext';
import PopupWrapper, { PopupType } from '../../components/Popup';
import PopupGreeting from '../../components/Popup/PopupGreeting';
import { INotLocatedShipField } from 'mobx/not-located-ships/not-located-ships-model';
import { Orientation } from '../../utils/interfaces';
import { useEffect } from 'react';
import { useStore } from '../../mobx/store';
import { BASE_URL, initialShips } from '../../utils/constants';
import { RequestCreator } from '../../api/request-creator';
import { getSnapshot } from 'mobx-state-tree';

export const HomePage = () => {
    const store = useStore();

    const requestCreator = RequestCreator.getInstance();

    const paths = window.location.pathname.split('/');
    const gameId = paths[1];
    const userId = paths[2];

    useEffect(() => {
        requestCreator.gameId = Number(gameId);
        requestCreator.userId = Number(userId);
        store.notLocatedShipsStore.setShips(initialShips);
        if (gameId && userId) {
            store.locatedShipsStore.fetchShips();
        }
    }, []);

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
