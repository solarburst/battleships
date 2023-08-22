import { useStore } from '../../mobx/store';
import { PopupContext } from '../../context/PopupContext';
import React, { useContext } from 'react';

const PopupGreeting = () => {
    const { close } = useContext(PopupContext);

    const store = useStore();

    const onClickHandler = async () => {
        const data = await store.gamesStore.createGame();

        const gameId = data.id;
        const userId = data.firstUser;

        // store.gamesStore.loadGame(String(gameId), String(userId));

        window.history.replaceState('', '', `/${gameId}/${userId}`);
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
