import React from 'react';
import { FIELD_SIZE } from '../../../utils/constants';

const LetterRow = () => {
    const alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];
    const letters = [];

    for (let i = 0; i <= FIELD_SIZE; i++) {
        letters.push(<div className="cell" key={i}>{alphabet[i]}</div>);
    }

    return <div className="main__playground-field__letter-stroke">{letters}</div>;
};

export default LetterRow;
