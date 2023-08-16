import { PopupContext } from '../../context/PopupContext';
import React, { useContext } from 'react';

const PopupGreeting = () => {
    const { close } = useContext(PopupContext);

    return (
        <>
            <h2 className="popup__content-title">Привет!</h2>
            <p className="popup__content-text">Можешь создать игру</p>
            <button className="button popup__content-button" onClick={() => close()}>Создать игру</button>
        </>
    );
};

export default PopupGreeting;
