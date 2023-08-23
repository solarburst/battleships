import React from 'react';
import { ShipIcon } from '../ShipIcon';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Orientation, Stage } from '../../../utils/interfaces';
import { INotLocatedShip } from 'mobx/not-located-ships/not-located-ships-model';
import { ILocatedShip } from 'mobx/located-ships/located-ships-model';
import { useStore } from '../../../mobx/store';

interface IPlacedShipProps {
    ship: ILocatedShip | INotLocatedShip;
}

const PlacedShipComponent = ({ ship }: IPlacedShipProps) => {
    const store = useStore();

    const gameStarted = store.gamesStore.currentGame?.stage === Stage.GAME;

    const handleOnDragStart = () => {
        // !gameStarted ? store.locatedShipsStore.setMovingShip(ship)
        if (!gameStarted) {
            store.locatedShipsStore.setMovingShip(ship)
        }
        // store.locatedShipsStore.setMovingShip(ship);
    };

    const handleOnDragEnd = () => {
        store.locatedShipsStore.setMovingShip(null);
    };

    const isVertical = ship.orientation === Orientation.Vertical;

    const length = ship.length;

    const classes = classNames({
        ship: true,
        [`ship--${ship.length}`]: true,
        'ship--vertical': isVertical,
        [`ship--${ship.x}-x`]: ship.x,
        [`ship--${ship.y}-y`]: ship.y,
        'ship--blocked': ship.isPlaced && !ship.x && !ship.y,
        'ship--not-draggable': gameStarted,
    });

    const handleOnDoubleClick = () => {
        ship.changeOrientation();
    };

    return (
        <div className={classes}
            key={ship.id}
            draggable={!gameStarted}
            onDragStart={handleOnDragStart}
            onDoubleClick={handleOnDoubleClick}
            onDragEnd={handleOnDragEnd}
        >
            <ShipIcon length={length} />
        </div>
    );
};

export const PlacedShip = observer(PlacedShipComponent);
