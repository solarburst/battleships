import React, { useState, createContext } from 'react';

export const PopupContext = createContext({
    isOpen: true,
    close: () => {},
    open: () => {},
});

interface IPopupProviderProps {
    children: React.ReactNode;
}

export const PopupProvider = ({ children }: IPopupProviderProps) => {
    const [isOpen, toggle] = useState(true);

    const close = () => toggle(false);

    const open = () => toggle(true);

    return (
        <PopupContext.Provider value={{ isOpen, close, open }}>
            {children}
        </PopupContext.Provider>
    );
};
