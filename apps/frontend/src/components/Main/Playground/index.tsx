import React, { useMemo, useState } from 'react';
import Icon from '../Icon';
import LetterRow from './LetterRow';
import NumberColumn from './NumberColumn';
import { FieldCells } from './FieldCells';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { Orientation } from '../../../utils/interfaces';
import { PlacedShip } from '../PlacedShip';
import { ShipIcon } from '../ShipIcon';
import { INotLocatedShip, INotLocatedShipField } from 'mobx/notLocatedShips/not-located-ships';
import { ILocatedShip } from 'mobx/locatedShips/located-ships';
import { getSnapshot } from 'mobx-state-tree';

const PlaygroundComponent = () => {
    const store = useStore();

    // type ship
    const [draggedElem, setDraggedElem] = useState<ILocatedShip | INotLocatedShip | null>();

    const initialShips: INotLocatedShipField[] = useMemo(() => [
        {
            id: '1',
            length: 4,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '2',
            length: 3,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '3',
            length: 3,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '4',
            length: 2,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '5',
            length: 2,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '6',
            length: 2,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '7',
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '8',
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '9',
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
        {
            id: '10',
            length: 1,
            orientation: Orientation.Horizontal,
            isPlaced: false,
        },
    ], []);

    useMemo(() => store.notLocatedShipsStore.setShips(initialShips), []);

    const handleOnDragStart = (ship: ILocatedShip | INotLocatedShip) => {
        console.log('drag start');
        if (ship) {
            setDraggedElem(ship);
        }
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
