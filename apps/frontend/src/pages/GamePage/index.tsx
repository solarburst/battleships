import { Playground } from '../../components/Main/Playground';
import Header from '../../components/Header';
import { PopupProvider } from '../../context/PopupContext';
import React from 'react';
import Field from '../../components/Main/Playground/Field';

const GamePage = () => {
    return (
        <PopupProvider>
            <Header />
            <div className="main container">
                <Field />
            </div>
        </PopupProvider>
    );
};

export default GamePage;
