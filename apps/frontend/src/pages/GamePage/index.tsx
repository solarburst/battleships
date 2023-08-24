import Header from '../../components/Header';
import { PopupContext, PopupProvider } from '../../context/PopupContext';
import React from 'react';
import Field from '../../components/Main/Playground/Field';
import { FieldOwner, Stage } from '../../utils/interfaces';
import { Chat } from '../../components/Chat';
import { useStore } from '../../mobx/store';
import PopupWrapper, { PopupType } from '../../components/Popup';
import PopupLose from '../../components/Popup/PopupLose';
import PopupWin from '../../components/Popup/PopupWin';

const GamePage = () => {
    const store = useStore();

    return (
        <PopupProvider>
            <Header />
            <div className="game container">
                <Field isMyField={true} />
                <Field isMyField={false} />
            </div>
            <Chat />
            {
                (store.gamesStore.currentGame?.stage === Stage.OVER)
                    ? <PopupContext.Consumer>
                        {store.gamesStore.isMyTurn
                            ? () => <PopupWrapper type={PopupType.Win}><PopupWin /></PopupWrapper>
                            : () => <PopupWrapper type={PopupType.Lose}><PopupLose /></PopupWrapper>}
                    </PopupContext.Consumer>
                    : <></>
            }
        </PopupProvider>
    );
};

export default GamePage;
