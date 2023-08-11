import React from 'react';
import { FIELD_SIZE } from '../../../utils/constants';
import { PlacedShip } from '../PlacedShip';
import { observer } from 'mobx-react';
import { useStore } from '../../../mobx/store';

interface IFieldCellsProps {
    handleOnDrop: (y: number, x: number) => void;
    handleDragOver: (event: React.DragEvent) => void;
    handleOnDragStart: (shipId: number) => void;
}

const FieldCellsComponent = ({ handleOnDrop, handleDragOver, handleOnDragStart }: IFieldCellsProps) => {
    const store = useStore();

    const cells = [];

    let count = 0;

    for (let i = 0; i <= FIELD_SIZE; i++) {
        for (let j = 0; j <= FIELD_SIZE; j++) {
            cells.push(
                <div className="cell cell--bg"
                    onDrop={() => handleOnDrop(i, j)}
                    onDragOver={handleDragOver}
                    key={count++}
                ></div>,
            );
        }
    }

    return (
        <div className="main__playground-field__cells">
            {cells}
            {Array.from(store.shipsStore.ships.values()).map((ship) => {
                if (ship.isPlaced) {
                    return <PlacedShip ship={ship} key={ship.id} handleOnDragStart={handleOnDragStart} />;
                }
            })}
        </div>);
};

export const FieldCells = observer(FieldCellsComponent);
