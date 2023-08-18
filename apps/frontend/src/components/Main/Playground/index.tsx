import React, { useState } from 'react';
import Icon from '../Icon';
import LetterRow from './LetterRow';
import NumberColumn from './NumberColumn';
import { FieldCells } from './FieldCells';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { PlacedShip } from '../PlacedShip';
import { INotLocatedShip, INotLocatedShipField } from 'mobx/not-located-ships/not-located-ships-model';
import { ILocatedShip } from 'mobx/located-ships/located-ships-model';

interface IPlaygroundProps {
    draggedElem: ILocatedShip | INotLocatedShip | null;
    setDraggedElem: (ship: ILocatedShip | INotLocatedShip | null) => void;
    handleOnDragStart: (ship: ILocatedShip | INotLocatedShip) => void;
}

const PlaygroundComponent = ({ draggedElem, setDraggedElem, handleOnDragStart }: IPlaygroundProps) => {
    const store = useStore();

    const handleDragOver = (event: React.DragEvent<Element>) => {
        event.preventDefault();
    };

    const handleDeleteAll = () => {
        store.locatedShipsStore.deleteShips();
    };

    return (
        <div>
            <div className="main__playground" onDragOver={(e) => handleDragOver(e)}>
                <div className="main__playground-buttons">
                    <div className="main__playground-buttons-item">
                        <Icon name="random" />
                        <button className="button--clear main__playground-buttons-text">
                            Расставить рандомно
                        </button>
                    </div>
                    <div className="main__playground-buttons-item">
                        <Icon name="bin" />
                        <button onClick={() => handleDeleteAll()} className="button--clear main__playground-buttons-text">
                            Очистить все
                        </button>
                    </div>
                </div>
                <div className="main__playground-field">
                    {<LetterRow />}
                    <div className="main__playground-field-wrapper">
                        {<NumberColumn />}
                        {<FieldCells
                            handleOnDragStart={handleOnDragStart}
                            ship={draggedElem}
                            setShip={setDraggedElem}
                        />}
                    </div>
                </div>
            </div>
            <div className="ships">
                <div className="ships-big">
                    {Array.from(store.notLocatedShipsStore.getShips.values()).map((ship) => {
                        if (ship.length > 2) {
                            return <PlacedShip ship={ship} key={ship.id} handleOnDragStart={handleOnDragStart} />;
                        }
                    })}
                </div>
                <div className="ships-small">
                    {Array.from(store.notLocatedShipsStore.getShips.values()).map((ship) => {
                        if (ship.length <= 2) {
                            return <PlacedShip ship={ship} key={ship.id} handleOnDragStart={handleOnDragStart} />;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export const Playground = observer(PlaygroundComponent);
