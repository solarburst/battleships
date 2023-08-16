import { PopupContext } from '../../context/PopupContext';
import React, { ReactElement, useContext } from 'react';

export enum PopupType {
    Win,
    Lose,
    Greeting,
}

interface IPopupProps {
    type: PopupType;
    children: ReactElement;
}

const PopupWrapper = ({ children }: IPopupProps) => {
    const { isOpen } = useContext(PopupContext);

    return (
        <>
            {isOpen && (
                <div className="popup">
                    <div className="popup__content">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default PopupWrapper;
