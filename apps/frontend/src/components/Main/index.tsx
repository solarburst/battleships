import React, { useState } from 'react';
import Info from './Info';
import { Playground } from './Playground';
import { observer } from 'mobx-react';
import { ILocatedShip } from 'mobx/located-ships/located-ships-model';
import { INotLocatedShip } from 'mobx/not-located-ships/not-located-ships-model';

const MainComponent = () => {
    return (
        <div className="main container">
            <Playground />
            <Info />
        </div>
    );
};

export const Main = observer(MainComponent);
