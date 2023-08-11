import React, { useEffect, useState } from 'react';
import { CELL_SIZE } from '../../../utils/constants';
import { ShipIcon } from '../ShipIcon';
import { observer } from 'mobx-react';
import { IShip } from '../../../mobx/models/ships';
import { useStore } from '../../../mobx/store';

interface IPlacedShipProps {
    ship: IShip;
    handleOnDragStart: (shipId: number) => void;
}

const PlacedShipComponent = ({ ship, handleOnDragStart }: IPlacedShipProps) => {
    const store = useStore();

    const foundedShip = Array.from(store.shipsStore.ships.values()).find((shipInArr) => shipInArr.id === ship.id);

    const isVertical = foundedShip?.orientation === 'vertical';

    const length = ship.length;

    const verticalTransform = `rotate(90deg) translateY(${18 * (length - 1) + 2}px) translateX(${18 * (length - 1) - 2}px)`;
    // transform: rotate(90deg) translateY(2px) translateX(-2px)

    const style = {
        left: (ship.x === 0) ? `${ship.x}` : `${(CELL_SIZE * ship.x!)}px`,
        top: (ship.y === 0) ? `${ship.y}` : `${(CELL_SIZE * ship.y!)}px`,
        transform: isVertical ? verticalTransform : '',
    };

    const handleOnDoubleClick = () => {
        foundedShip?.changeOrientation();
    };

    return (
        <div className={ship.isPlaced ? `ship ship${length}` : `ship ship${length} ship--not-in-field`}
            draggable
            key={ship.id}
            style={style}
            onDragStart={() => handleOnDragStart(ship.id)}
            onDoubleClick={() => handleOnDoubleClick()}
        >
            <ShipIcon length={length} />
        </div>
    );
};

export const PlacedShip = observer(PlacedShipComponent);
