import React, { useDeferredValue } from 'react';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { PlacedShip } from '../PlacedShip';
import PlaygroundButtons from './PlaygroundButtons';
import Field from './Field';
import { PositionChecker } from '../../../utils/positionChecker';

const PlaygroundComponent = () => {
    const store = useStore();

    const positionChecker = new PositionChecker();

    const handleDragOver = (event: React.DragEvent<Element>) => {
        event.preventDefault();
    };

    const handleDeleteAll = async () => {
        await store.locatedShipsStore.deleteShips();

        const userInfo = store.gamesStore.getUserInfo(Number(store.gamesStore.currentUserId));

        if (userInfo.id && userInfo.ready === true) {
            await store.gamesStore.setReady(userInfo.id);
        }
    };

    const handleRandom = async () => {
        await handleDeleteAll();

        positionChecker.randomizeShipsLocation();

        await store.notLocatedShipsStore.placeRandomShips(positionChecker.shipsToSend);

        positionChecker.shipsToSend = [];
    };

    function debounce(func: () => void, timeout = 300) {
        let timer;

        return (...args) => {
            clearTimeout(timer);

            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    return (
        <div>
            <div className="main__playground" onDragOver={(e) => handleDragOver(e)}>
                <PlaygroundButtons handleDeleteAll={handleDeleteAll} handleRandom={debounce(handleRandom)} />
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
