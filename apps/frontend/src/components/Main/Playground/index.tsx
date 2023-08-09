import React, { useMemo, useState } from 'react';
import Icon from '../Icon';
import { FIELD_SIZE } from '../../../utils/constants';
import { IShip, IMenuShip } from 'utils/interfaces';
import PlacedShip from '../PlacedShip';
import LetterRow from './LetterRow';
import NumberColumn from './NumberColumn';
import FieldCells from './FieldCells';

const Playground = () => {
    const initialShips: IMenuShip[] = useMemo(() => [
        {
            length: 4,
            orientation: 'horizontal',
            isPlaced: false,
        },
        {
            length: 3,
            orientation: 'horizontal',
            isPlaced: false,
        },
        {
            length: 3,
            orientation: 'horizontal',
            isPlaced: false,
        },
        {
            length: 2,
            orientation: 'horizontal',
            isPlaced: false,
        },
        {
            length: 2,
            orientation: 'horizontal',
            isPlaced: false,
        },
        {
            length: 2,
            orientation: 'horizontal',
            isPlaced: false,
        },
        {
            length: 1,
            orientation: 'horizontal',
            isPlaced: false,
        },
        {
            length: 1,
            orientation: 'horizontal',
            isPlaced: false,
        },
        {
            length: 1,
            orientation: 'horizontal',
            isPlaced: false,
        },
        {
            length: 1,
            orientation: 'horizontal',
            isPlaced: false,
        },
    ], []);

    console.log('render');

    const [ships, setShips] = useState<IShip[]>([]);
    const [dragShipLength, setDragShipLength] = useState<number>();

    const handleOnDrop = (y: number, x: number) => {
        const length = dragShipLength;

        if (length !== undefined) {
            setShips([
                ...ships, {
                    x,
                    y,
                    length,
                    orientation: 'horizontal',
                    isPlaced: true,
                },
            ]);
        }
    };

    const handleDragOver = (event: React.DragEvent<Element>) => {
        event.preventDefault();
    };

    const handleOnDrag = (length: number) => {
        setDragShipLength(length);
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
                        {<FieldCells handleOnDrop={handleOnDrop} handleDragOver={handleDragOver} ships={ships} />}
                    </div>
                </div>
            </div>
            <div className="ships">
                <div className="ships-big">
                    {initialShips.map((ship) => {
                        if (ship.length > 2) {
                            return <div className={`ship ship${ship.length} ship--not-in-field`} draggable key={initialShips.indexOf(ship)} onDragStart={() => handleOnDrag(ship.length)}>
                                <Icon name={`ship${ship.length}`} />
                            </div>;
                        }
                    })}
                </div>
                <div className="ships-small">
                    {initialShips.map((ship) => {
                        if (ship.length <= 2) {
                            return <div className={`ship ship${ship.length} ship--not-in-field`} draggable key={initialShips.indexOf(ship)} onDragStart={() => handleOnDrag(ship.length)}>
                                <Icon name={`ship${ship.length}`} />
                            </div>;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default Playground;
