import React from 'react';
import Info from './Info';
import Playground from './Playground';

const Main = () => {
    return (
        <div className="main container">
            <Playground />
            <Info />
        </div>
    );
};

export default Main;
