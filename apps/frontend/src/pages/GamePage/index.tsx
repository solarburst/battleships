import Header from '../../components/Header';
import { PopupProvider } from '../../context/PopupContext';
import React from 'react';
import Field from '../../components/Main/Playground/Field';
import { FieldOwner } from '../../utils/interfaces';
import { Chat } from '../../components/Chat';

const GamePage = () => {
    return (
        <PopupProvider>
            <Header />
            <div className="game container">
                <Field isMyField={true} />
                <Field isMyField={false} />
            </div>
            <Chat />
        </PopupProvider>
    );
};

export default GamePage;
