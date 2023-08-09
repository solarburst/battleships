import React from 'react';
import { ReactSVG } from 'react-svg';

interface IconProps {
    name: string;
}

const Icon = ({ name }: IconProps) => {
    const baseUrl = `public/assets/svg/${name}.svg`;

    return (
        <ReactSVG src={baseUrl} />
    );
};

export default Icon;
