import { useStore } from '../../mobx/store';
import { PopupContext } from '../../context/PopupContext';
import React, { useContext } from 'react';
import Icon from '../../components/Main/Icon';
import { getSnapshot } from 'mobx-state-tree';

const PopupWin = () => {
    const { close } = useContext(PopupContext);

    const store = useStore();

    const onClickHandler = async () => {
        const data = await store.gamesStore.createGame();

        const gameId = data.id;
        const userId = data.firstUser;

        window.history.replaceState('', '', `/${gameId}/${userId}`);
        close();

        window.location.reload();
    };

    return (
        <div className="popup__content-win">
            <Icon name="win1" className="popup__content-win-icon" />
            <div className="popup__content-win-inner">
                <h2 className="popup__content-title">Победа!</h2>
                <p className="popup__content-text">Вы победили. Соперник <br /> Потерял все корабли </p>
                <button className="button popup__content-button" onClick={() => onClickHandler()}>Начать новую</button>
            </div>
            <Icon name="win2" className="popup__content-win-icon" />
        </div>
    );
};

export default PopupWin;
