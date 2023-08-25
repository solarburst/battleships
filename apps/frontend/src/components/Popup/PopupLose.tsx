import { useStore } from '../../mobx/store';
import { PopupContext } from '../../context/PopupContext';
import React, { useContext } from 'react';
import { getSnapshot } from 'mobx-state-tree';

const PopupLose = () => {
    const { close } = useContext(PopupContext);

    const store = useStore();

    const onClickHandler = async () => {
        const data = await store.gamesStore.createGame();

        const gameId = data.id;
        const userId = data.firstUser;

        window.history.replaceState('', '', `/${gameId}/${userId}`);
        close();

        window.location.reload();
        console.log(getSnapshot(store));
    };

    return (
        <>
            <h2 className="popup__content-title">Поражение</h2>
            <p className="popup__content-text">Ваши корабли потоплены. <br /> Повезет в следующий раз </p>
            <button className="button popup__content-button" onClick={() => onClickHandler()}>Начать новую</button>
        </>
    );
};

export default PopupLose;
