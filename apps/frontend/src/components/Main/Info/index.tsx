import React from 'react';

const Info = () => {
    return (
        <div className="main__info">
            <h2 className="main__info-title">
                Запуск игры
            </h2>
            <div className="main__info-instructions">
                <div className="main__info-instructions-item">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line
                            x1="3.00043"
                            y1="15.3789"
                            x2="28.0004"
                            y2="15.3789"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M26.0004 11.3789L30.2431 15.6215L26.0004 19.8642"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M5.24261 19.8643L0.999974 15.6216L5.24261 11.379"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <line
                            x1="15.3793"
                            y1="28.2434"
                            x2="15.3793"
                            y2="3.24342"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M11.3793 5.24297L15.622 1.00033L19.8646 5.24297"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M19.8647 26.0008L15.622 30.2434L11.3794 26.0008"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <p className="main__info-instructions-item-text">
                        С помощью мыши расставь <br /> корабли на игровом поле
                    </p>
                </div>
                <div className="main__info-instructions-item">
                    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M22.8769 23.116C21.0159 24.9778 18.6266 26.2214 16.0339 26.6774C13.4412 27.1335 10.7709
                            26.7799 8.38622 25.6648C6.00154 24.5497 4.01817 22.7273 2.70582 20.4452C1.39346 18.1631
                            0.815825 15.5322 1.05144 12.9103C1.28705 10.2884 2.32449 7.8026 4.02267 5.79107C5.72086
                            3.77954 7.99737 2.33985 10.5426 1.66778C13.0879 0.995717 15.7784 1.12388 18.2483
                            2.03486C20.71812.94584 22.8475 4.59542 24.3468 6.75927L26.2387 10.4376"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M28.138 3.89502L26.2084 10.6638L19.5225 8.46283"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <p className="main__info-instructions-item-text">
                        Двойным нажатием ЛКМ <br /> поворачивай корабли
                    </p>
                </div>
                <div className="main__info-instructions-item">
                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 5H1V24H20V5Z"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M6 5V1H25V19H20"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <p className="main__info-instructions-item-text">
                        Пригласи соперника к битве по ссылке <br /> https://battleships.dev.sibirix.ru/czePjBbqZs
                    </p>
                </div>
            </div>
            <button className="main__info-button-start">НАЧНИ ИГРУ</button>
        </div>
    );
};

export default Info;
