import React from 'react';
import Icon from '../Icon';

interface IPlaygroundButtons {
    handleDeleteAll: () => void;
}

const PlaygroundButtons = ({ handleDeleteAll }: IPlaygroundButtons) => {
    return (
        <div className="main__playground-buttons">
            <div className="main__playground-buttons-item">
                <Icon name="random" />
                <button className="button--clear main__playground-buttons-text">
                    Расставить рандомно
                </button>
            </div>
            <div className="main__playground-buttons-item">
                <Icon name="bin" />
                <button onClick={handleDeleteAll} className="button--clear main__playground-buttons-text">
                    Очистить все
                </button>
            </div>
        </div>
    );
};

export default PlaygroundButtons;
