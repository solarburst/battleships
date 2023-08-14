import React, { useMemo, useState } from 'react';
import Icon from '../Icon';
import LetterRow from './LetterRow';
import NumberColumn from './NumberColumn';
import { FieldCells } from './FieldCells';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { Orientation, IShip } from '../../../mobx/models/ships';
import { IShipField } from '../../../utils/interfaces';
import { PlacedShip } from '../PlacedShip';
import { getSnapshot } from 'mobx-state-tree';
import { ShipIcon } from '../ShipIcon';

const PlaygroundComponent = () => {
    const store = useStore();

    // type ship
    const [draggedElem, setDraggedElem] = useState<IShipField | null>();

    const initialShips: IShipField[] = useMemo(() => [
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

    const handleOnDragStart = (shipId: number) => {
        const foundedShip = Array.from(store.shipsStore.ships.values()).find((ship) => ship.id === shipId);

        if (foundedShip) {
            setDraggedElem({
                id: foundedShip.id,
                x: foundedShip.x,
                y: foundedShip.y,
                length: foundedShip.length,
                orientation: foundedShip.orientation,
            });
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
                    {Array.from(store.shipsStore.ships.values()).map((ship) => {
                        if (ship.length > 2 && !ship.isPlaced) {
                            return <PlacedShip ship={ship} key={ship.id} handleOnDragStart={handleOnDragStart} />;
                        }
                        if (ship.length > 2 && ship.isPlaced) {
                            return <ShipIcon length={ship.length} style={{ opacity: 0.4 }} />;
                        }
                    })}
                </div>
                <div className="ships-small">
                    {Array.from(store.shipsStore.ships.values()).map((ship) => {
                        if (ship.length <= 2 && !ship.isPlaced) {
                            return <PlacedShip ship={ship} key={ship.id} handleOnDragStart={handleOnDragStart} />;
                        }
                        if (ship.length <= 2 && ship.isPlaced) {
                            return <ShipIcon length={ship.length} style={{ opacity: 0.4 }} />;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export const Playground = observer(PlaygroundComponent);
