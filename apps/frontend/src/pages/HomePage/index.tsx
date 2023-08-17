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
import { BASE_URL } from '../../utils/constants';

const HomePageComponent = () => {
    const store = useStore();

    const initialShips: INotLocatedShipField[] = [
        {
            id: '1',
            length: 4,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '2',
            length: 3,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '3',
            length: 3,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '4',
            length: 2,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '5',
            length: 2,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '6',
            length: 2,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '7',
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '8',
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '9',
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '10',
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
    ];

    useEffect(() => {
        store.notLocatedShipsStore.setShips(initialShips);
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

export const HomePage = observer(HomePageComponent);
