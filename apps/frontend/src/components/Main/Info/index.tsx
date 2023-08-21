import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { useStore } from '../../../mobx/store';
import { getSnapshot } from 'mobx-state-tree';
import { RequestCreator } from '../../../api/request-creator';
import { BASE_URL } from '../../../utils/constants';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

const InfoComponent = () => {
    const store = useStore();

    const requestCreator = RequestCreator.getInstance();

    const paths = window.location.pathname.split('/');
    const gameId = paths[1];
    const userId = paths[2];

    const handleOnClick = () => {
        if (store.locatedShipsStore.getShips.length === 10) {
            store.gamesStore.setReady(Number(userId));
        } else {
            toast('Недостаточно кораблей');
        }
        console.log(getSnapshot(store));
    };

    useEffect(() => {
        requestCreator.gameId = Number(gameId);
        requestCreator.userId = Number(userId);
        if (requestCreator.gameId && requestCreator.userId) {
            store.gamesStore.setGame();
        }
    }, []);

    return (
        <div className="main__info">
            <h2 className="main__info-title">
                Запуск игры
            </h2>
            <div className="main__info-instructions">
                <div className="main__info-instructions-item">
                    <Icon name="drag" />
                    <p className="main__info-instructions-item-text">
                        С помощью мыши расставь <br /> корабли на игровом поле
                    </p>
                </div>
                <div className="main__info-instructions-item">
                    <Icon name="turn" />
                    <p className="main__info-instructions-item-text">
                        Двойным нажатием ЛКМ <br /> поворачивай корабли
                    </p>
                </div>
                <div className="main__info-instructions-item">
                    <Icon name="invite-info" />
                    <p className="main__info-instructions-item-text">
                        Пригласи соперника к битве по ссылке <br />
                        {(store.gamesStore.getGame()?.inviteLink)
                            ? <a className="link" href={BASE_URL + store.gamesStore.getGame()?.inviteLink}>
                                {BASE_URL + store.gamesStore.getGame()?.inviteLink}
                            </a>
                            : ''}
                    </p>
                </div>
            </div>
            {(store.gamesStore.getUserInfo(Number(userId)).ready)
                ? <button className="button main__info-button-start" onClick={handleOnClick}>НЕ ГОТОВ</button>
                : <button className="button main__info-button-start" onClick={handleOnClick}>НАЧНИ ИГРУ</button>}
        </div>
    );
};

export const Info = observer(InfoComponent);
