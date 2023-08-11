import React, { useMemo, useState } from 'react';
import Icon from '../Icon';
import LetterRow from './LetterRow';
import NumberColumn from './NumberColumn';
import { FieldCells } from './FieldCells';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { Orientation, IShip } from '../../../mobx/models/ships';
import { IMenuShip } from '../../../utils/interfaces';
import { PlacedShip } from '../PlacedShip';
import { getSnapshot } from 'mobx-state-tree';

const PlaygroundComponent = () => {
    const store = useStore();

    const [draggableElem, setDraggableElem] = useState<number>();

    const initialShips: IMenuShip[] = useMemo(() => [
        {
            id: 1,
            length: 4,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: 2,
            length: 3,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: 3,
            length: 3,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: 4,
            length: 2,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: 5,
            length: 2,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: 6,
            length: 2,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: 7,
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: 8,
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: 9,
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: 10,
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
    ], []);

    useMemo(() => store.shipsStore.setShips(initialShips), [initialShips, store.shipsStore]);

    console.log(getSnapshot(store));

    const handleOnDrop = (y: number, x: number) => {
        const foundedShip = Array.from(store.shipsStore.ships.values()).find((ship) => ship.id === draggableElem);

        foundedShip?.changeCoordinates(x, y);
    };

    // без этого не устанавливаются корабли
    const handleDragOver = (event: React.DragEvent<Element>) => {
        event.preventDefault();
    };

    const handleOnDragStart = (shipId: number) => {
        setDraggableElem(shipId);
    };

    return (
        <div>
            <div className="main__playground">
                <div className="main__playground-buttons">
                    <div className="main__playground-buttons-item">
                        <Icon name="random" />
                        <p className="main__playground-buttons-text">
                            Расставить рандомно
                        </p>
                    </div>
                    <div className="main__playground-buttons-item">
                        <Icon name="bin" />
                        <p className="main__playground-buttons-text">
                            Очистить все
                        </p>
                    </div>
                </div>
                <div className="main__playground-field">
                    {<LetterRow />}
                    <div className="main__playground-field-wrapper">
                        {<NumberColumn />}
                        {<FieldCells handleOnDrop={handleOnDrop} handleDragOver={handleDragOver} handleOnDragStart={handleOnDragStart} />}
                    </div>
                </div>
            </div>
            <div className="ships">
                <div className="ships-big">
                    {Array.from(store.shipsStore.ships.values()).map((ship) => {
                        if (ship.length > 2 && !ship.isPlaced) {
                            return <PlacedShip ship={ship} key={ship.id} handleOnDragStart={handleOnDragStart} />;
                        }
                    })}
                </div>
                <div className="ships-small">
                    {Array.from(store.shipsStore.ships.values()).map((ship) => {
                        if (ship.length <= 2 && !ship.isPlaced) {
                            return <PlacedShip ship={ship} key={ship.id} handleOnDragStart={handleOnDragStart} />;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export const Playground = observer(PlaygroundComponent);
