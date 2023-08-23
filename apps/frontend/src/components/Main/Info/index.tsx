import React from 'react';
import Icon from '../Icon';
import { useStore } from '../../../mobx/store';
import { BASE_URL, initialShips } from '../../../utils/constants';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

const InfoComponent = () => {
    const store = useStore();

    const handleOnClick = () => {
        if (store.locatedShipsStore.ships.length === initialShips.length) {
            store.gamesStore.setReady(Number(store.gamesStore.currentUserId));
        } else {
            toast('Недостаточно кораблей');
        }
    };

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
                        {(store.gamesStore.inviteLink)
                            ? <a className="link" href={BASE_URL + store.gamesStore.inviteLink}>
                                {BASE_URL + store.gamesStore.inviteLink}
                            </a>
                            : ''}
                    </p>
                </div>
            </div>
            {(store.gamesStore.getUserInfo(Number(store.gamesStore.currentUserId)).ready)
                ? <button className="button main__info-button-start" onClick={handleOnClick}>НЕ ГОТОВ</button>
                : <button className="button main__info-button-start" onClick={handleOnClick}>НАЧНИ ИГРУ</button>}
        </div>
    );
};

export const Info = observer(InfoComponent);
