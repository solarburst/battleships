import React from 'react';
import { CELL_SIZE, INDENT } from '../../../utils/constants';
import { IShip } from '../../../utils/interfaces';
import ShipIcon from '../ShipIcon';

interface IPlacedShipProps {
    ship: IShip;
}

const PlacedShip = ({ ship }: IPlacedShipProps) => {
    const style = {
        left: `${(CELL_SIZE * ship.x)}px`,
        top: `${(CELL_SIZE * ship.y)}px`,
    };

    const length = ship.length;

    return (
        <div className={`ship ship${length}`} style={style}>
            <ShipIcon length={length} />
        </div>
    );
};

export default PlacedShip;
