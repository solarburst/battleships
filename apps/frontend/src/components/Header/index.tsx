import React from 'react';
import Icon from '../Main/Icon';

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">SEA BATTLE</h1>
            <div className="header__invite">
                <Icon name="invite" />
                <p className="header__invite-text">Пригласить игрока</p>
            </div>
        </header>
    );
};

export default Header;
