import React from 'react';
import Ship1 from './ship1';
import Ship2 from './ship2';
import Ship3 from './ship3';
import Ship4 from './ship4';

interface ShipProps {
    length: number
}

const Ship = ({ length }: ShipProps) => {
    if (length === 1) {
        return <Ship1 />;
    }
    if (length === 2) {
        return <Ship2 />;
    }
    if (length === 3) {
        return <Ship3 />;
    }
    if (length === 4) {
        return <Ship4 />;
    }
};

export default Ship;
