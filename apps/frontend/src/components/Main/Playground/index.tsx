import React from 'react';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { PlacedShip } from '../PlacedShip';
import PlaygroundButtons from './PlaygroundButtons';
import Field from './Field';
import { FIELD_SIZE, initialShips } from '../../../utils/constants';
import { Orientation } from '../../../utils/interfaces';

interface IShipCoordinates {
    orientation: Orientation;
    x: number;
    y: number;
    length: number;
}

const PlaygroundComponent = () => {
    const store = useStore();

    const handleDragOver = (event: React.DragEvent<Element>) => {
        event.preventDefault();
    };

    const handleDeleteAll = () => {
        store.locatedShipsStore.deleteShips();
        const userInfo = store.gamesStore.getUserInfo(Number(store.gamesStore.currentUserId));

        if (userInfo.id && userInfo.ready === true) {
            store.gamesStore.setReady(userInfo.id);
        }
    };

    let shipsToSend: IShipCoordinates[] = [];

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * (max + 1));
    };

    const checkCoordinates = (coordinates: IShipCoordinates, length: number, positions: number[][]) => {
        const fromY = coordinates.y === 0 ? coordinates.y : coordinates.y - 1;
        let toY;

        if (coordinates.orientation === Orientation.Vertical && coordinates.y + length - 1 === FIELD_SIZE) {
            toY = coordinates.y + length - 1;
        } else if (coordinates.orientation === Orientation.Vertical && coordinates.y + length - 1 < FIELD_SIZE) {
            toY = coordinates.y + length;
        } else if (coordinates.orientation === Orientation.Horizontal && coordinates.y === FIELD_SIZE) {
            toY = coordinates.y;
        } else if (coordinates.orientation === Orientation.Horizontal && coordinates.y < FIELD_SIZE) {
            toY = coordinates.y + 1;
        }

        const fromX = coordinates.x === 0 ? coordinates.x : coordinates.x - 1;
        let toX;

        if (coordinates.orientation === Orientation.Horizontal && coordinates.x + length - 1 === FIELD_SIZE) {
            toX = coordinates.x + length - 1;
        } else if (coordinates.orientation === Orientation.Horizontal && coordinates.x + length - 1 < FIELD_SIZE) {
            toX = coordinates.x + length;
        } else if (coordinates.orientation === Orientation.Vertical && coordinates.x === FIELD_SIZE) {
            toX = coordinates.x;
        } else if (coordinates.orientation === Orientation.Vertical && coordinates.x < FIELD_SIZE) {
            toX = coordinates.x + 1;
        }

        if (toX === undefined || toY === undefined) {
            return false;
        }

        if (positions.slice(fromY, toY + 1)
            .filter(arr => arr.slice(fromX, toX + 1).includes(1))
            .length > 0) {
            return false;
        }

        return true;
    };

    const getRandomCoordinates = (length: number, positions: number[][]): boolean => {
        const orientation = getRandomInt(1) ? Orientation.Horizontal : Orientation.Vertical;

        let x, y;

        if (orientation === Orientation.Horizontal) {
            x = getRandomInt(FIELD_SIZE);
            y = getRandomInt(FIELD_SIZE - length + 1);
        } else {
            x = getRandomInt(FIELD_SIZE - length + 1);
            y = getRandomInt(FIELD_SIZE);
        }

        const coordinates = {
            orientation,
            x,
            y,
            length,
        };

        const result = checkCoordinates(coordinates, length, positions);

        if (!result) {
            return getRandomCoordinates(length, positions);
        }

        for (let i = 0; i < length; i++) {
            if (coordinates.orientation === Orientation.Vertical) {
                positions[y + i][x] = 1;
            }
            if (coordinates.orientation === Orientation.Horizontal) {
                positions[y][x + i] = 1;
            }
        }

        shipsToSend.push(coordinates);

        return result;
    };

    const randomizeShipsLocation = () => {
        const positions: number[][] = [];

        for (let i = 0; i <= FIELD_SIZE; i++) {
            positions[i] = new Array(FIELD_SIZE + 1).fill(0);
        }

        for (const ship of initialShips) {
            const length = ship.length;

            getRandomCoordinates(length, positions);
        }
    };

    const handleRandom = () => {
        handleDeleteAll();

        randomizeShipsLocation();
        store.notLocatedShipsStore.placeRandomShips(shipsToSend);
        shipsToSend = [];
    };

    return (
        <div>
            <div className="main__playground" onDragOver={(e) => handleDragOver(e)}>
                <PlaygroundButtons handleDeleteAll={handleDeleteAll} handleRandom={handleRandom} />
                <Field isMyField />
            </div>
            <div className="ships">
                <div className="ships-big">
                    {Array.from(store.notLocatedShipsStore.getShips.values()).map((ship) => {
                        if (ship.length > 2) {
                            return <PlacedShip ship={ship} key={ship.id} />;
                        }
                    })}
                </div>
                <div className="ships-small">
                    {Array.from(store.notLocatedShipsStore.getShips.values()).map((ship) => {
                        if (ship.length <= 2) {
                            return <PlacedShip ship={ship} key={ship.id} />;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export const Playground = observer(PlaygroundComponent);
