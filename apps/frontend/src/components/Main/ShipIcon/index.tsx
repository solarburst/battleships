import React from 'react';
import Icon from '../Icon';

const lengths = [1, 2, 3, 4];

interface ShipProps {
    length: typeof lengths[number];
}

const ShipIcon = ({ length }: ShipProps) => {
    return <Icon name={`ship${length}`} />;
};

export default ShipIcon;
