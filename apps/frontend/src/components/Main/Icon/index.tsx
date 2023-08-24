import React from 'react';
import { ReactSVG } from 'react-svg';

interface IconProps {
    name: string;
    className?: string;
}

const Icon = ({ name, className }: IconProps) => {
    const baseUrl = `assets/svg/${name}.svg`;

    return (
        <ReactSVG src={baseUrl} className={className} />
    );
};

export default Icon;
