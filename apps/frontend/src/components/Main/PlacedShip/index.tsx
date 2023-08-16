import React from 'react';
import { ShipIcon } from '../ShipIcon';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { useStore } from '../../../mobx/store';
import { Orientation } from '../../../utils/interfaces';
import { INotLocatedShip } from 'mobx/notLocatedShips/not-located-ships';
import { ILocatedShip } from 'mobx/locatedShips/located-ships';

interface IPlacedShipProps {
    ship: ILocatedShip | INotLocatedShip;
    handleOnDragStart: (ship: ILocatedShip | INotLocatedShip) => void;
}

const PlacedShipComponent = ({ ship, handleOnDragStart }: IPlacedShipProps) => {
    const store = useStore();

    const isVertical = ship?.orientation === Orientation.Vertical;

    const length = ship.length;

    const classes = classNames({
        ship: true,
        [`ship--${length}--vertical`]: isVertical,
        [`ship--${ship.x}-x`]: ship.x ? true : false,
        [`ship--${ship.y}-y`]: ship.y ? true : false,
        ['ship--blocked']: ship.isPlaced && !ship.x && !ship.y,
    });

    const handleOnDoubleClick = () => {
        ship?.changeOrientation();
    };

    return (
        <div className={classes}
            key={ship.id}
            onDragStart={() => handleOnDragStart(ship)}
            onDoubleClick={() => handleOnDoubleClick()}
        >
            <ShipIcon length={length} />
        </div>
    );
};

export const PlacedShip = observer(PlacedShipComponent);
