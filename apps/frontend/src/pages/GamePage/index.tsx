import Header from '../../components/Header';
import { PopupProvider } from '../../context/PopupContext';
import React from 'react';
import Field from '../../components/Main/Playground/Field';
import { FieldOwner } from '../../utils/interfaces';

const GamePage = () => {
    return (
        <PopupProvider>
            <Header />
            <div className="game container">
                <Field owner={FieldOwner.ME} />
                <Field owner={FieldOwner.ENEMY} />
            </div>
        </PopupProvider>
    );
};

export default GamePage;
