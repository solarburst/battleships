import { useStore } from '../../mobx/store';
import { RequestCreator } from '../../api/request-creator';
import { PopupContext } from '../../context/PopupContext';
import React, { useContext } from 'react';
import { getSnapshot } from 'mobx-state-tree';

const PopupGreeting = () => {
    const { close } = useContext(PopupContext);

    const store = useStore();

    const requestCreator = RequestCreator.getInstance();

    const onClickHandler = async () => {
        const data = await requestCreator.createGame();

        store.gamesStore.setGame();

        window.history.replaceState('', '', `/${requestCreator.gameId}/${requestCreator.userId}`);
        close();
    };

    return (
        <>
            <h2 className="popup__content-title">Привет!</h2>
            <p className="popup__content-text">Можешь создать игру</p>
            <button className="button popup__content-button" onClick={() => onClickHandler()}>Создать игру</button>
        </>
    );
};

export default PopupGreeting;
