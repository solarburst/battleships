import Header from '../../components/Header';
import { PopupContext, PopupProvider } from '../../context/PopupContext';
import React from 'react';
import { Field } from '../../components/Main/Playground/Field';
import { Stage } from '../../utils/interfaces';
import { Chat } from '../../components/Chat';
import { useStore } from '../../mobx/store';
import PopupWrapper, { PopupType } from '../../components/Popup';
import PopupLose from '../../components/Popup/PopupLose';
import PopupWin from '../../components/Popup/PopupWin';
import { MAX_HITS } from '../../utils/constants';
import { observer } from 'mobx-react';

const GamePageComponent = () => {
    const store = useStore();

    const currentUserId = Number(store.gamesStore.currentUserId);

    const enemyId = Number(store.gamesStore.enemyId);

    return (
        <PopupProvider>
            <Header />
            <div className="game container">
                <div className="game__field">
                    <div className="game__field-info">
                        <div className="game__field-fleet">Твой флот</div>
                        <div className="game__field-damage">
                            Повреждения:
                            {Math.round(store.shotsStore.shipsDamageCount(enemyId) / MAX_HITS * 100)}%
                        </div>
                    </div>
                    <Field isMyField={true} />
                </div>
                <div className="game__field">
                    <div className="game__field-info">
                        <div className="game__field-fleet">Флот соперника</div>
                        <div className="game__field-damage">
                            Повреждения:
                            {Math.round(store.shotsStore.shipsDamageCount(currentUserId) / MAX_HITS * 100)}%
                        </div>
                    </div>
                    <Field isMyField={false} />
                </div>
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

export const GamePage = observer(GamePageComponent);
