import React, { CSSProperties } from 'react';
import Icon from '../Icon';
import { useStore } from '../../../mobx/store';
import { observer } from 'mobx-react';

const lengths = [1, 2, 3, 4];

interface ShipProps {
    length: typeof lengths[number];
    style?: CSSProperties;
}

const ShipIconComponent = ({ length, style }: ShipProps) => {
    const store = useStore();

    return <Icon name={`ship${length}`} style={style} />;
};

export const ShipIcon = observer(ShipIconComponent);
