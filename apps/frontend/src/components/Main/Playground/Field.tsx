import React from 'react';
import LetterRow from './LetterRow';
import NumberColumn from './NumberColumn';
import { FieldCells } from './FieldCells';

interface IField {
    isMyField: boolean;
}

const Field = ({ isMyField }: IField) => {
    return (
        <div className="main__playground-field">
            {<LetterRow />}
            <div className="main__playground-field-wrapper">
                {<NumberColumn />}
                {<FieldCells isMyField={isMyField} />}
            </div>
        </div>
    );
};

export default Field;
