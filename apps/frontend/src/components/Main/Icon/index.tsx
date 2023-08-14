import React, { CSSProperties } from 'react';
import { ReactSVG } from 'react-svg';

interface IconProps {
    name: string;
    style?: CSSProperties;
}

const Icon = ({ name, style }: IconProps) => {
    const baseUrl = `public/assets/svg/${name}.svg`;

    return (
        <ReactSVG src={baseUrl} style={style} />
    );
};

export default Icon;
