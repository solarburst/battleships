import React, { ReactElement, useMemo, useState } from 'react';
import { FIELD_SIZE } from '../../../utils/constants';
import { PlacedShip } from '../PlacedShip';
import { observer } from 'mobx-react';
import { useStore } from '../../../mobx/store';
import { Orientation } from '../../../utils/interfaces';
import classNames from 'classnames';
import { ShotResult } from '../../../mobx/shots/shots-model';

interface IFieldCells {
    isMyField: boolean;
}

interface IHoveredCell {
    x: number;
    y: number;
}

const FieldCellsComponent = ({ isMyField }: IFieldCells) => {
    const store = useStore();

    const [hoveredCell, setHoveredCell] = useState<IHoveredCell | null>();

    const ship = store.locatedShipsStore.movingShip;

    const userId = Number(store.gamesStore.currentUserId);

    const enemyId = Number(store.gamesStore.enemyId);

    let count = 0;

    const handleOnDrop = (event: React.DragEvent, y: number, x: number) => {
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

    const handleOnClick = (y: number, x: number) => {
        if (isMyField === false) {
            store.shotsStore.createShot(x, y);
        }
    };

    const shots = store.shotsStore.shots(userId);

    const memoizedCells = useMemo(() => {
        const cells: ReactElement[] = [];

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

                const shot = store.shotsStore.getShotByPosition(j, i, isMyField ? enemyId : userId);

                const shotClasses = classNames('shot', {
                    'shot--hit': shot?.status === ShotResult.HIT || shot?.status === ShotResult.KILL,
                });

                cells.push(
                    <div className="cell--wrapper"
                        onDrop={(e) => handleOnDrop(e, i, j)}
                        onDragOver={handleDragOver}
                        onDragEnter={() => handleOnDragEnter(i, j)}
                        onMouseEnter={() => handleOnMouseEnter(i, j)}
                        onMouseLeave={() => handleOnMouseLeave(i, j)}
                        onClick={() => handleOnClick(i, j)}
                        key={count++}
                    >
                        <div className={classes}>
                            {shot
                                ? <div className={shotClasses} />
                                : null}
                        </div>
                    </div>,
                );
            }
        }

        return cells;
    }, [hoveredCell, ship, shots]);

    return (
        <div className="main__playground-field-cells">
            {memoizedCells}
            {isMyField === true && store.locatedShipsStore.ships.map((shipElem) => {
                return <PlacedShip ship={shipElem} key={shipElem.id} />;
            })}
            {isMyField === false && store.locatedShipsStore.enemyShips.map((shipElem) => {
                return <PlacedShip ship={shipElem} key={shipElem.id} />;
            })}
        </div>);
};

export const FieldCells = observer(FieldCellsComponent);
