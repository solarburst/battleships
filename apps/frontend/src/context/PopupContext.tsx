import React, { useState, createContext } from 'react';

export const PopupContext = createContext({
    isOpen: true,
    close: () => {},
});

interface IPopupProviderProps {
    children: React.ReactNode;
}

export const PopupProvider = ({ children }: IPopupProviderProps) => {
    const [isOpen, toggle] = useState(true);

    const close = () => toggle(false);

    return (
        <PopupContext.Provider value={{ isOpen, close }}>
            {children}
        </PopupContext.Provider>
    );
};
