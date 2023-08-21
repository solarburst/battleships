import React from 'react';
import LetterRow from './LetterRow';
import NumberColumn from './NumberColumn';
import { FieldCells } from './FieldCells';

const Field = () => {
    return (
        <div className="main__playground-field">
            {<LetterRow />}
            <div className="main__playground-field-wrapper">
                {<NumberColumn />}
                {<FieldCells />}
            </div>
        </div>
    );
};

export default Field;
