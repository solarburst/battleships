import { createGame } from '../../api/games';
import { PopupContext } from '../../context/PopupContext';
import React, { useContext } from 'react';

const PopupGreeting = () => {
    const { close } = useContext(PopupContext);

    const onClickHandler = async () => {
        const data = await createGame();

        window.history.replaceState('', '', `/${data.id}/${data.firstUser}`);
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
