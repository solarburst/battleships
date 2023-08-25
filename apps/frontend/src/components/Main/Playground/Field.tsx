import React from 'react';
import LetterRow from './LetterRow';
import NumberColumn from './NumberColumn';
import { FieldCells } from './FieldCells';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { Stage } from '../../../utils/interfaces';

interface IField {
    isMyField: boolean;
}

const FieldComponent = ({ isMyField }: IField) => {
    const store = useStore();

    return (
        <div className="main__playground-field">
            {<LetterRow />}
            <div className="main__playground-field-wrapper">
                {<NumberColumn />}
                {<FieldCells isMyField={isMyField} />}
            </div>
            {store.gamesStore.isMyTurn && isMyField && store.gamesStore.currentGame?.stage === Stage.GAME
                ? <div className="main__playground-field-turn">Ваш ход</div>
                : null}
        </div>
    );
};

export const Field = observer(FieldComponent);
