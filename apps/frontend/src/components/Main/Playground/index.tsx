import React from 'react';
import Icon from '../Icon';
import LetterRow from './LetterRow';
import NumberColumn from './NumberColumn';
import { FieldCells } from './FieldCells';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { PlacedShip } from '../PlacedShip';
import { RequestCreator } from '../../../api/request-creator';
import PlaygroundButtons from './PlaygroundButtons';
import Field from './Field';

const PlaygroundComponent = () => {
    const store = useStore();

    const requestCreator = RequestCreator.getInstance();

    const handleDragOver = (event: React.DragEvent<Element>) => {
        event.preventDefault();
    };

    const handleDeleteAll = () => {
        store.locatedShipsStore.deleteShips();
        const userInfo = store.gamesStore.getUserInfo(requestCreator.userId);

        if (userInfo.id && userInfo.ready === true) {
            store.gamesStore.setReady(userInfo.id);
        }
    };

    return (
        <div>
            <div className="main__playground" onDragOver={(e) => handleDragOver(e)}>
                <PlaygroundButtons handleDeleteAll={handleDeleteAll} />
                <Field />
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
