import React from 'react';
import Icon from '../Main/Icon';
import { useStore } from '../../mobx/store';
import { BASE_URL } from '../../utils/constants';
import { toast } from 'react-toastify';

const Header = () => {
    const store = useStore();

    const handleOnClick = () => {
        const linkToCopy = BASE_URL + store.gamesStore.inviteLink;

        navigator.clipboard.writeText(linkToCopy);

        toast('Скопировано');
    };

    return (
        <header className="header">
            <h1 className="header__title">SEA BATTLE</h1>
            <div className="header__invite">
                <Icon name="invite" />
                <button className="button--clear header__invite-text" onClick={handleOnClick}>Пригласить игрока</button>
            </div>
        </header>
    );
};

export default Header;
