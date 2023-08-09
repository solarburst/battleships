import React, { useState } from 'react';
import Icon from '../Icon';
import { FIELD_SIZE } from '../../../utils/constants';
import { IShip } from 'utils/interfaces';
import placedShip from '../PlacedShip';

const Playground = () => {
    const initialShips: Partial<IShip>[] = [
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
    ];

    const [ships, setShips] = useState<IShip[]>([]);
    const [dragShipLength, setDragShipLength] = useState<number>();

    const handleOnDrop = (x: number, y: number) => {
        const length = dragShipLength;

        setShips([
            ...ships, {
                x,
                y,
                length,
                orientation: 'horizontal',
                isPlaced: true,
            },
        ]);
    };

    // const handleOnDragEnd = (event: React.DragEvent) => {
    //     const shipInfo = ships[ships.length - 1];

    // };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleOnDrag = (length: number) => {
        setDragShipLength(length);
    };

    const createLetterColumn = () => {
        const alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];
        const letters = [];

        for (let i = 0; i <= FIELD_SIZE; i++) {
            letters.push(<div className="cell" key={i}>{alphabet[i]}</div>);
        }

        return <div className="main__playground-field__letter-stroke">{letters}</div>;
    };

    const createNumberColumn = () => {
        const numbers = [];

        for (let i = 0; i <= FIELD_SIZE; i++) {
            numbers.push(<div className="cell" key={i}>{i}</div>);
        }

        return <div className="main__playground-field__number-stroke">{numbers}</div>;
    };

    const createCells = () => {
        const cells = [];

        for (let i = 0; i <= FIELD_SIZE; i++) {
            for (let j = 0; j <= FIELD_SIZE; j++) {
                cells.push(<div className="cell cell--bg" data-x={`${j}`} data-y={`${i}`} onDrop={() => handleOnDrop(i, j)} onDragOver={handleDragOver}></div>);
            }
        }

        return <div className="main__playground-field__cells">{cells}</div>;
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
                    {createLetterColumn()}
                    {createNumberColumn()}
                    {createCells()}
                    {ships.map((ship) => placedShip(ship))}
                </div>
            </div>
            <div className="ships">
                <div className="ships-big">
                    {initialShips.map((ship) => {
                        if (ship.length! > 2) {
                            return <div className={`ship${ship.length} menu`} draggable onDragStart={() => handleOnDrag(ship.length!)}>
                                <Icon name={`ship${ship.length}`} />
                            </div>;
                        }
                    })}
                </div>
                <div className="ships-small">
                    {initialShips.map((ship) => {
                        if (ship.length! <= 2) {
                            return <div className={`ship${ship.length} menu`} draggable onDragStart={() => handleOnDrag(ship.length!)}>
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
