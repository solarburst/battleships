import React, { useState } from 'react';
import { FIELD_SIZE } from '../../../utils/constants';
import { PlacedShip } from '../PlacedShip';
import { observer } from 'mobx-react';
import { useStore } from '../../../mobx/store';
import { Orientation } from '../../../utils/interfaces';
import { INotLocatedShip } from 'mobx/notLocatedShips/not-located-ships';
import { ILocatedShip } from 'mobx/locatedShips/located-ships';

interface IFieldCellsProps {
    handleOnDragStart: (ship: ILocatedShip | INotLocatedShip) => void;
    ship?: ILocatedShip | INotLocatedShip | null;
    setShip: (ship: ILocatedShip | INotLocatedShip | null) => void;
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

    console.log(hoveredCell);

    const handleOnDrop = (y: number, x: number) => {
        if (ship) {
            console.log('ship', ship);
            ship.placeShip(x, y);

            setShip(null);
        }
    };

    const handleOnDragEnter = (y: number, x: number) => {
        setHoveredCell({
            x,
            y,
        });
    };

    // const handleOnDragLeave = (y: number, x: number) => {
    //     if (ship) {
    //         setShip({
    //             ...ship,
    //             x: undefined,
    //             y: undefined,
    //         });
    //     }
    // };

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

            if (ship && hoveredCell && ship.orientation === Orientation.Horizontal) {
                for (let k = 0; k < ship.length; k++) {
                    if (hoveredCell.x + k === j && hoveredCell.y === i) {
                        isShip = true;
                    }
                }
            }

            if (ship && hoveredCell && ship.orientation === Orientation.Vertical) {
                for (let k = 0; k < ship.length; k++) {
                    if (hoveredCell.x === j && hoveredCell.y + k === i) {
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
                    // onDragLeave={() => handleOnDragLeave(i, j)}
                    onMouseEnter={() => handleOnMouseEnter(i, j)}
                    onMouseLeave={() => handleOnMouseLeave(i, j)}
                    key={count++}
                ></div>,
            );
        }
    }

    return (
        <div className="main__playground-field-cells">
            {cells}
            {Array.from(store.locatedShipsStore.getShips.values()).map((shipElem) => {
                return <PlacedShip ship={shipElem} key={shipElem.id} handleOnDragStart={handleOnDragStart} />;
            })}
        </div>);
};

export const FieldCells = observer(FieldCellsComponent);
