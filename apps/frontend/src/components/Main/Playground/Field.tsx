import React from 'react';
import LetterRow from './LetterRow';
import NumberColumn from './NumberColumn';
import { FieldCells } from './FieldCells';
import { FieldOwner } from '../../../utils/interfaces';

interface IField {
    owner: FieldOwner;
}

const Field = ({ owner }: IField) => {
    return (
        <div className="main__playground-field">
            {<LetterRow />}
            <div className="main__playground-field-wrapper">
                {<NumberColumn />}
                {<FieldCells owner={owner} />}
            </div>
        </div>
    );
};

export default Field;
