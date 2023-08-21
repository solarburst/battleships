import Header from '../../components/Header';
import { PopupProvider } from '../../context/PopupContext';
import React from 'react';

const GamePage = () => {
    return (
        <PopupProvider>
            <Header />
        </PopupProvider>
    );
};

export default GamePage;
