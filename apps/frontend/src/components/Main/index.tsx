import React from 'react';
import { Info } from './Info';
import { Playground } from './Playground';

const MainComponent = () => {
    return (
        <div className="main container">
            <Playground />
            <Info />
        </div>
    );
};

export const Main = MainComponent;
