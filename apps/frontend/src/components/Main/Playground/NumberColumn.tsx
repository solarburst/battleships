import React from 'react';
import { FIELD_SIZE } from '../../../utils/constants';

const NumberColumn = () => {
    const numbers = [];

    for (let i = 1; i <= FIELD_SIZE + 1; i++) {
        numbers.push(<div className="cell" key={i}>{i}</div>);
    }

    return <div className="main__playground-field__number-stroke">{numbers}</div>;
};

export default NumberColumn;
