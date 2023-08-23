import React from 'react';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { PlacedShip } from '../PlacedShip';
import PlaygroundButtons from './PlaygroundButtons';
import Field from './Field';

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

    return (
        <div>
            <div className="main__playground" onDragOver={(e) => handleDragOver(e)}>
                <PlaygroundButtons handleDeleteAll={handleDeleteAll} />
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
