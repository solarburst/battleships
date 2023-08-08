import React from 'react';
import '../../styles/styles.scss';

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">SEA BATTLE</h1>
            <div className="header__invite">
                <svg width="20" height="20" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.2174 3.78271H1V17.0001H14.2174V3.78271Z"
                        stroke="#676B97"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M4.47852 3.78261V1H17.6959V13.5217H14.2176"
                        stroke="#676B97"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p className="header__invite-text">Пригласить игрока</p>
            </div>
        </header>
    );
};

export default Header;
