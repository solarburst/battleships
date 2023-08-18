import React, { useState } from 'react';
import Info from './Info';
import { Playground } from './Playground';
import { observer } from 'mobx-react';
import { ILocatedShip } from 'mobx/located-ships/located-ships-model';
import { INotLocatedShip } from 'mobx/not-located-ships/not-located-ships-model';

const MainComponent = () => {
    const [draggedElem, setDraggedElem] = useState<ILocatedShip | INotLocatedShip | null>();

    const handleOnDragStart = (ship: ILocatedShip | INotLocatedShip) => {
        if (ship) {
            setDraggedElem(ship);
        }
    };

    const handleOnDrop = (ship: ILocatedShip | null) => {
        if (ship) {
            ship.deleteShip();
        }
        setDraggedElem(null);
    };

    const handleDragOver = (event: React.DragEvent<Element>) => {
        event.preventDefault();
    };

    return (
        <div className="main container" onDrop={() => handleOnDrop(draggedElem)} onDragOver={(e) => handleDragOver(e)}>
            <Playground draggedElem={draggedElem} setDraggedElem={setDraggedElem} handleOnDragStart={handleOnDragStart} />
            <Info />
        </div>
    );
};

export const Main = observer(MainComponent);
