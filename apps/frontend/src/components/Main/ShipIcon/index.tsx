import React, { CSSProperties } from 'react';
import Icon from '../Icon';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';

const lengths = [1, 2, 3, 4];

interface ShipProps {
    length: typeof lengths[number];
}

const ShipIconComponent = ({ length }: ShipProps) => {
    return <Icon name={`ship${length}`} />;
};

export const ShipIcon = observer(ShipIconComponent);
