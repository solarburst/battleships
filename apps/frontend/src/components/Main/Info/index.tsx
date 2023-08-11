import React from 'react';
import Icon from '../Icon';

const Info = () => {
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
                        Пригласи соперника к битве по ссылке <br /> https://battleships.dev.sibirix.ru/czePjBbqZs
                    </p>
                </div>
            </div>
            <button className="button main__info-button-start">НАЧНИ ИГРУ</button>
        </div>
    );
};

export default Info;
