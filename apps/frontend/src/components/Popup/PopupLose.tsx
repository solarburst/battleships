import { RequestCreator } from '../../api/request-creator';
import { PopupContext } from '../../context/PopupContext';
import React, { useContext } from 'react';

const PopupLose = () => {
    const { close } = useContext(PopupContext);

    const requestCreator = RequestCreator.getInstance();

    const onClickHandler = async () => {
        const data = await requestCreator.createGame();

        window.history.replaceState('', '', `/${requestCreator.gameId}/${requestCreator.userId}`);
        close();
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
