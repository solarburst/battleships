import React, { useState } from 'react';
import { FIELD_SIZE } from '../../../utils/constants';
import { PlacedShip } from '../PlacedShip';
import { observer } from 'mobx-react';
import { useStore } from '../../../mobx/store';
import { Orientation } from '../../../mobx/models/ships';
import { IShipField } from '../../../utils/interfaces';

interface IFieldCellsProps {
    handleOnDragStart: (shipId: number) => void;
    ship?: IShipField | null;
    setShip: (ship: IShipField | null) => void;
}

interface IHoveredCell {
    x: number;
    y: number;
}

const FieldCellsComponent = ({ handleOnDragStart, ship, setShip }: IFieldCellsProps) => {
    const store = useStore();

    const [hoveredCell, setHoveredCell] = useState<IHoveredCell | null>();

    const cells = [];

    let count = 0;

    const handleOnDrop = (y: number, x: number) => {
        if (ship) {
            const foundedShip = Array.from(store.shipsStore.ships.values()).find((shipItem) => shipItem.id === ship.id);

            foundedShip?.changeCoordinates(x, y);

            setShip(null);
        }
    };

    const handleOnDragEnter = (y: number, x: number) => {
        if (ship) {
            setShip({
                ...ship,
                x,
                y,
            });
        }
    };

    const handleOnDragLeave = (y: number, x: number) => {
        if (ship) {
            setShip({
                ...ship,
                x: undefined,
                y: undefined,
            });
        }
    };

    // без этого не устанавливаются корабли
    const handleDragOver = (event: React.DragEvent<Element>) => {
        event.preventDefault();
    };

    const handleOnMouseEnter = (y: number, x: number) => {
        setHoveredCell({
            x,
            y,
        });
    };

    const handleOnMouseLeave = (y: number, x: number) => {
        setHoveredCell(null);
    };

    for (let i = 0; i <= FIELD_SIZE; i++) {
        for (let j = 0; j <= FIELD_SIZE; j++) {
            let isShip = false;

            if (ship && ship.x && ship.orientation === Orientation.Horizontal) {
                for (let k = 0; k < ship.length; k++) {
                    if (ship.x + k === j && ship.y === i) {
                        isShip = true;
                    }
                }
            }

            if (ship && ship.y && ship.orientation === Orientation.Vertical) {
                for (let k = 0; k < ship.length; k++) {
                    if (ship.x === j && ship.y + k === i) {
                        isShip = true;
                    }
                }
            }

            let isHoveredCell = false;

            if (hoveredCell && hoveredCell.x) {
                for (let m = 0; m < 10; m++) {
                    if (hoveredCell.x === j && m === i) {
                        isHoveredCell = true;
                    }
                }
            }

            if (hoveredCell && hoveredCell.y) {
                for (let n = 0; n < 10; n++) {
                    if (n === j && hoveredCell.y === i) {
                        isHoveredCell = true;
                    }
                }
            }

            cells.push(
                <div className={`cell  ${isHoveredCell ? 'cell--hovered-axis' : ''} ${isShip ? 'cell--dragged' : 'cell--bg'}`}
                    onDrop={() => handleOnDrop(i, j)}
                    onDragOver={handleDragOver}
                    onDragEnter={() => handleOnDragEnter(i, j)}
                    onDragLeave={() => handleOnDragLeave(i, j)}
                    onMouseEnter={() => handleOnMouseEnter(i, j)}
                    onMouseLeave={() => handleOnMouseLeave(i, j)}
                    key={count++}
                ></div>,
            );
        }
    }

    return (
        <div className="main__playground-field__cells">
            {cells}
            {Array.from(store.shipsStore.ships.values()).map((shipElem) => {
                if (shipElem.isPlaced) {
                    return <PlacedShip ship={shipElem} key={shipElem.id} handleOnDragStart={handleOnDragStart} />;
                }
            })}
        </div>);
};

export const FieldCells = observer(FieldCellsComponent);
