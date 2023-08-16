import React from 'react';
import { ShipIcon } from '../ShipIcon';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Orientation } from '../../../utils/interfaces';
import { INotLocatedShip } from 'mobx/not-located-ships/not-located-ships-model';
import { ILocatedShip } from 'mobx/located-ships/located-ships-model';

interface IPlacedShipProps {
    ship: ILocatedShip | INotLocatedShip;
    handleOnDragStart: (ship: ILocatedShip | INotLocatedShip) => void;
}

const PlacedShipComponent = ({ ship, handleOnDragStart }: IPlacedShipProps) => {
    const isVertical = ship.orientation === Orientation.Vertical;

    const length = ship.length;

    const classes = classNames({
        ship: true,
        [`ship--${ship.length}`]: true,
        'ship--vertical': isVertical,
        [`ship--${ship.x}-x`]: ship.x,
        [`ship--${ship.y}-y`]: ship.y,
        'ship--blocked': ship.isPlaced && !ship.x && !ship.y,
    });

    const handleOnDoubleClick = () => {
        ship.changeOrientation();
    };

    return (
        <div className={classes}
            key={ship.id}
            draggable
            onDragStart={() => handleOnDragStart(ship)}
            onDoubleClick={() => handleOnDoubleClick()}
        >
            <ShipIcon length={length} />
        </div>
    );
};

export const PlacedShip = observer(PlacedShipComponent);
