import React from 'react';
import Icon from '../Icon';

interface ShipProps {
    length: number
}

const Ship = ({ length }: ShipProps) => {
    if (length === 1) {
        return <Icon name="ship1" />;
    }
    if (length === 2) {
        return <Icon name="ship2" />;
    }
    if (length === 3) {
        return <Icon name="ship3" />;
    }
    if (length === 4) {
        return <Icon name="ship4" />;
    }
};

export default Ship;
