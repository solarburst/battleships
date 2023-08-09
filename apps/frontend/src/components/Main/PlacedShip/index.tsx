import React from 'react';
import { CELL_SIZE, INDENT } from '../../../utils/constants';
import Ship from '../Ship';
import { IShip } from '../../../utils/interfaces';

const placedShip = (ship: IShip) => {
    const style = {
        left: `${(CELL_SIZE * ship.x + INDENT)}px`,
        top: `${(CELL_SIZE * ship.y + INDENT)}px`,
    };

    const length = ship.length!;

    return (
        <div className={`ship${length}`} style={style}>
            <Ship length={length} />
        </div>
    );
};

export default placedShip;
