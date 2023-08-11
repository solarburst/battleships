import { PopupContext } from '../../context/PopupContext';
import React, { useContext, useState } from 'react';

export enum PopupType {
    Win,
    Lose,
    Greeting,
}

interface IPopupProps {
    type: PopupType;
}

const Popup = ({ type }: IPopupProps) => {
    const { isOpen, close } = useContext(PopupContext);

    return (
        <>
            {isOpen && (
                <div className="popup">
                    <div className="popup__content">
                        {type === PopupType.Greeting && (
                            <>
                                <h2 className="popup__content-title">Привет!</h2>
                                <p className="popup__content-text">Можешь создать игру</p>
                                <button className="button popup__content-button" onClick={() => close()}>Создать игру</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;
