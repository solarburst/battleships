import React, { ReactElement, useMemo, useState } from 'react';
import { FIELD_SIZE } from '../../../utils/constants';
import { PlacedShip } from '../PlacedShip';
import { observer } from 'mobx-react';
import { useStore } from '../../../mobx/store';
import { Orientation, FieldOwner } from '../../../utils/interfaces';
import classNames from 'classnames';

interface IFieldCells {
    owner: FieldOwner;
}

interface IHoveredCell {
    x: number;
    y: number;
}

const FieldCellsComponent = ({ owner }: IFieldCells) => {
    const store = useStore();

    const [hoveredCell, setHoveredCell] = useState<IHoveredCell | null>();

    const ship = store.locatedShipsStore.movingShip;

    let count = 0;

    const cells: ReactElement[] = [];

    const handleOnDrop = (event: Event, y: number, x: number) => {
        if (ship) {
            event.stopPropagation();

            ship.placeShip(x, y);

            store.locatedShipsStore.setMovingShip(null);
        }
    };

    const handleOnDragEnter = (y: number, x: number) => {
        setHoveredCell({
            x,
            y,
        });
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

    const memoizedCells = useMemo(() => {
        for (let i = 0; i <= FIELD_SIZE; i++) {
            for (let j = 0; j <= FIELD_SIZE; j++) {
                let isShip = false;

                if (ship && hoveredCell) {
                    if (
                        ship.orientation === Orientation.Horizontal
                        && hoveredCell.y === i && hoveredCell.x <= j && hoveredCell.x + ship.length > j
                    ) {
                        isShip = true;
                    }

                    if (
                        ship.orientation === Orientation.Vertical
                        && hoveredCell.x === j && hoveredCell.y <= i && hoveredCell.y + ship.length > i
                    ) {
                        isShip = true;
                    }
                }

                let isHoveredCell = false;

                if (hoveredCell && hoveredCell.x === j) {
                    isHoveredCell = true;
                }

                if (hoveredCell && hoveredCell.y === i) {
                    isHoveredCell = true;
                }

                const classes = classNames('cell', {
                    'cell--hovered-axis': isHoveredCell,
                    'cell--dragged': isShip,
                    'cell--bg': !isShip,
                });

                cells.push(
                    <div className={classes}
                        onDrop={(e) => handleOnDrop(e, i, j)}
                        onDragOver={handleDragOver}
                        onDragEnter={() => handleOnDragEnter(i, j)}
                        onMouseEnter={() => handleOnMouseEnter(i, j)}
                        onMouseLeave={() => handleOnMouseLeave(i, j)}
                        key={count++}
                    ></div>,
                );
            }
        }

        return cells;
    }, [hoveredCell, ship]);

    return (
        <div className="main__playground-field-cells">
            {memoizedCells}
            {owner === FieldOwner.ME && store.locatedShipsStore.getShips.map((shipElem) => {
                return <PlacedShip ship={shipElem} key={shipElem.id} />;
            })}
        </div>);
};

export const FieldCells = observer(FieldCellsComponent);
