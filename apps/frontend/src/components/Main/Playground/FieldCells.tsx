import React from 'react';
import { FIELD_SIZE } from '../../../utils/constants';
import { IShip } from 'utils/interfaces';
import PlacedShip from '../PlacedShip';

interface IFieldCellsProps {
    handleOnDrop: (y: number, x: number) => void;
    handleDragOver: (event: React.DragEvent) => void;
    ships: IShip[];
}

const FieldCells = ({ handleOnDrop, handleDragOver, ships }: IFieldCellsProps) => {
    const cells = [];

    let count = 0;

    for (let i = 0; i <= FIELD_SIZE; i++) {
        for (let j = 0; j <= FIELD_SIZE; j++) {
            cells.push(<div className="cell cell--bg" onDrop={() => handleOnDrop(i, j)} onDragOver={handleDragOver} key={count++}></div>);
        }
    }

    return (
        <div className="main__playground-field__cells">
            {cells}
            {ships.map((ship) => <PlacedShip ship={ship} key={ships.indexOf(ship)} />)}
        </div>);
};

export default FieldCells;
