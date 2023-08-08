import React, { useRef, useState } from 'react';
import Ship from '../Ship';

interface IShip {
    x: number;
    y: number;
    length: number;
    orientation: string;
}

const Playground = () => {
    const [ships, setShips] = useState<IShip[]>([]);

    const cells = [];

    const placeShip = (ship: IShip) => {
        const style = {
            left: `${(36 * ship.x + 48)}px`,
            top: `${(36 * ship.y + 48)}px`,
        };

        const length = ship.length;

        return (
            <div className={`ship${length}`} style={style}>
                <Ship length={length} />
            </div>
        );
    };

    const handleOnDrop = (event: React.DragEvent) => {
        const x = event.target?.getAttribute('data-x');
        const y = event.target?.getAttribute('data-y');
        const length = event.dataTransfer.getData('shipLength') as string;

        setShips([
            ...ships, {
                x: Number(x),
                y: Number(y),
                length: Number(length),
                orientation: 'horizontal',
            },
        ]);
    };

    // const handleOnDragEnd = (event: React.DragEvent) => {
    //     const shipInfo = ships[ships.length - 1];

    // };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleOnDrag = (event: React.DragEvent, length: string) => {
        event.dataTransfer.setData('shipLength', length);
    };

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            cells.push(<div className="cell cell--bg" data-x={`${j}`} data-y={`${i}`} onDrop={handleOnDrop} onDragOver={handleDragOver}></div>);
        }
    }

    return (
        <div>
            <div className="main__playground">
                <div className="main__playground-buttons">
                    <div className="main__playground-buttons-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.04842 9.06735L1 12.0021L4.04842 14.9326"
                                stroke="#676B97"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M11.4965 12.0022L1.31543 12.0022"
                                stroke="#676B97"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M11.9512 1.06736L14.9996 4.00209L11.9512 6.93262"
                                stroke="#676B97"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M4.49902 4.0022L14.6801 4.0022"
                                stroke="#676B97"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <p className="main__playground-buttons-text">
                            Расставить рандомно
                        </p>
                    </div>
                    <div className="main__playground-buttons-item">
                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.1278 3.51294H2.43555V15H12.1278V3.51294Z"
                                stroke="white"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M12.1278 3.51294H2.43555V15H12.1278V3.51294Z"
                                stroke="#676B97"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M9.42119 1H5.13867V3.51279H9.42119V1Z"
                                stroke="white"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M9.42119 1H5.13867V3.51279H9.42119V1Z"
                                stroke="#676B97"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M1 3.49829H13.564"
                                stroke="white"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M1 3.49829H13.564"
                                stroke="#676B97"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M5.66602 6.56396V14.4613"
                                stroke="white"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M5.66602 6.56396V14.4613"
                                stroke="#676B97"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M8.89648 6.56396V14.4613"
                                stroke="white"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M8.89648 6.56396V14.4613"
                                stroke="#676B97"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <p className="main__playground-buttons-text">
                            Очистить все
                        </p>
                    </div>
                </div>
                <div className="main__playground-field">
                    <div className="main__playground-field__letter-stroke">
                        <div className="cell">
                            А
                        </div>
                        <div className="cell">
                            Б
                        </div>
                        <div className="cell">
                            В
                        </div>
                        <div className="cell">
                            Г
                        </div>
                        <div className="cell">
                            Д
                        </div>
                        <div className="cell">
                            Е
                        </div>
                        <div className="cell">
                            Ж
                        </div>
                        <div className="cell">
                            З
                        </div>
                        <div className="cell">
                            И
                        </div>
                        <div className="cell">
                            К
                        </div>
                    </div>
                    <div className="main__playground-field__number-stroke">
                        <div className="cell">
                            1
                        </div>
                        <div className="cell">
                            2
                        </div>
                        <div className="cell">
                            3
                        </div>
                        <div className="cell">
                            4
                        </div>
                        <div className="cell">
                            5
                        </div>
                        <div className="cell">
                            6
                        </div>
                        <div className="cell">
                            7
                        </div>
                        <div className="cell">
                            8
                        </div>
                        <div className="cell">
                            9
                        </div>
                        <div className="cell">
                            10
                        </div>
                    </div>
                    <div className="main__playground-field__cells">
                        {cells.map(cell => cell)}
                    </div>
                    {ships.map((ship) => placeShip(ship))}
                </div>
            </div>
            <div className="ships">
                <div className="ships-big">
                    <div className="ship4 menu" draggable onDragStart={(e) => handleOnDrag(e, '4')}>
                        <svg width="141" height="32" viewBox="0 0 141 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.75 32L114.618 32C125.248 32 135.046 26.156 140.226 16.7259C140.474 16.2747
                                140.474 15.7253 140.226 15.2741C135.046 5.844 125.248 0 114.618 0H15.75C7.05152
                                0 0 7.16344 0 16C0 24.8366 7.05151 32 15.75 32Z"
                                fill="#794DE2"
                            />
                            <circle
                                cx="124.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 124.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <circle
                                cx="88.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 88.875 15.75)"
                                fill="black" fill-opacity="0.1"
                            />
                            <circle
                                cx="52.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 52.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <circle
                                cx="16.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 16.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>
                    <div className="ship3 menu" draggable onDragStart={(e) => handleOnDrag(e, '3')}>
                        <svg width="105" height="32" viewBox="0 0 105 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.75 32H78.6178C89.2482 32 99.0461 26.156 104.226 16.7259C104.474 16.2747 104.474
                                15.7253 104.226 15.2741C99.0461 5.844 89.2482 0 78.6178 0H15.75C7.05152 0 0 7.16344
                                0 16C0 24.8366 7.05151 32 15.75 32Z"
                                fill="#695AFE"
                            />
                            <circle
                                cx="88.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 88.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <circle
                                cx="52.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 52.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <circle
                                cx="16.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 16.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>
                    <div className="ship3 menu" draggable onDragStart={(e) => handleOnDrag(e, '3')}>
                        <svg width="105" height="32" viewBox="0 0 105 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.75 32H78.6178C89.2482 32 99.0461 26.156 104.226 16.7259C104.474 16.2747 104.474
                                15.7253 104.226 15.2741C99.0461 5.844 89.2482 0 78.6178 0H15.75C7.05152 0 0 7.16344 0
                                16C0 24.8366 7.05151 32 15.75 32Z"
                                fill="#695AFE"
                            />
                            <circle
                                cx="88.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 88.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <circle
                                cx="52.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 52.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <circle
                                cx="16.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 16.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>
                </div>
                <div className="ships-small">
                    <div className="ship2 menu" draggable onDragStart={(e) => handleOnDrag(e, '2')}>
                        <svg width="69" height="32" viewBox="0 0 69 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.75 32L42.6178 32C53.2481 32 63.0461 26.156 68.2262 16.7259C68.4741 16.2747
                                68.4741 15.7253 68.2262 15.2741C63.0461 5.844 53.2481 -1.13488e-06 42.6178
                                -1.12751e-06L15.75 -1.10886e-06C7.05149 -1.10283e-06 -3.08307e-05 7.16344
                                -3.1217e-05 16C-3.16032e-05 24.8366 7.05149 32 15.75 32Z"
                                fill="#46A6F8"
                            />
                            <circle
                                cx="52.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 52.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <circle
                                cx="16.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 16.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>
                    <div className="ship2 menu" draggable onDragStart={(e) => handleOnDrag(e, '2')}>
                        <svg width="69" height="32" viewBox="0 0 69 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.75 32L42.6178 32C53.2481 32 63.0461 26.156 68.2262 16.7259C68.4741 16.2747
                                68.4741 15.7253 68.2262 15.2741C63.0461 5.844 53.2481 -1.13488e-06 42.6178
                                -1.12751e-06L15.75 -1.10886e-06C7.05149 -1.10283e-06 -3.08307e-05 7.16344 -3.1217e-05
                                16C-3.16032e-05 24.8366 7.05149 32 15.75 32Z"
                                fill="#46A6F8"
                            />
                            <circle
                                cx="52.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 52.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <circle
                                cx="16.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 16.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>
                    <div className="ship2 menu" draggable onDragStart={(e) => handleOnDrag(e, '2')}>
                        <svg width="69" height="32" viewBox="0 0 69 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.75 32L42.6178 32C53.2481 32 63.0461 26.156 68.2262 16.7259C68.4741 16.2747
                                68.4741 15.7253 68.2262 15.2741C63.0461 5.844 53.2481 -1.13488e-06 42.6178
                                -1.12751e-06L15.75 -1.10886e-06C7.05149 -1.10283e-06 -3.08307e-05 7.16344
                                -3.1217e-05 16C-3.16032e-05 24.8366 7.05149 32 15.75 32Z"
                                fill="#46A6F8"
                            />
                            <circle
                                cx="52.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 52.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <circle
                                cx="16.875"
                                cy="15.75"
                                r="6.75"
                                transform="rotate(90 16.875 15.75)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>
                    <div className="ship1 menu" draggable onDragStart={(e) => handleOnDrag(e, '1')}>
                        <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.9438 -9.57019e-07C20.09 -6.03553e-07 27.5938 4.42362 31.5382 11.5513L33.6031
                                15.2827C33.85 15.729 33.85 16.271 33.6031 16.7173L31.5382 20.4487C27.5938 27.5764
                                20.09 32 11.9438 32C5.34741 32 -1.17365e-06 26.6526 -8.8318e-07 20.0562L-5.25946e-07
                                11.9438C-2.35474e-07 5.3474 5.34741 -1.24324e-06 11.9438 -9.57019e-07Z"
                                fill="#4CB5C4"
                            />
                            <ellipse
                                cx="15.8667"
                                cy="16"
                                rx="6.75"
                                ry="6.8"
                                transform="rotate(90 15.8667 16)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>
                    <div className="ship1 menu" draggable onDragStart={(e) => handleOnDrag(e, '1')}>
                        <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.9438 -9.57019e-07C20.09 -6.03553e-07 27.5938 4.42362 31.5382 11.5513L33.6031
                                15.2827C33.85 15.729 33.85 16.271 33.6031 16.7173L31.5382 20.4487C27.5938 27.5764 20.09 32
                                11.9438 32C5.34741 32 -1.17365e-06 26.6526 -8.8318e-07 20.0562L-5.25946e-07
                                11.9438C-2.35474e-07 5.3474 5.34741 -1.24324e-06 11.9438 -9.57019e-07Z"
                                fill="#4CB5C4"
                            />
                            <ellipse
                                cx="15.8667"
                                cy="16"
                                rx="6.75"
                                ry="6.8"
                                transform="rotate(90 15.8667 16)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>
                    <div className="ship1 menu" draggable onDragStart={(e) => handleOnDrag(e, '1')}>
                        <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.9438 -9.57019e-07C20.09 -6.03553e-07 27.5938 4.42362 31.5382 11.5513L33.6031
                                15.2827C33.85 15.729 33.85 16.271 33.6031 16.7173L31.5382 20.4487C27.5938 27.5764 20.09
                                32 11.9438 32C5.34741 32 -1.17365e-06 26.6526 -8.8318e-07 20.0562L-5.25946e-07
                                11.9438C-2.35474e-07 5.3474 5.34741 -1.24324e-06 11.9438 -9.57019e-07Z"
                                fill="#4CB5C4"
                            />
                            <ellipse
                                cx="15.8667"
                                cy="16"
                                rx="6.75"
                                ry="6.8"
                                transform="rotate(90 15.8667 16)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>
                    <div className="ship1 menu" draggable onDragStart={(e) => handleOnDrag(e, '1')}>
                        <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.9438 -9.57019e-07C20.09 -6.03553e-07 27.5938 4.42362 31.5382 11.5513L33.6031
                                15.2827C33.85 15.729 33.85 16.271 33.6031 16.7173L31.5382 20.4487C27.5938 27.5764 20.09
                                32 11.9438 32C5.34741 32 -1.17365e-06 26.6526 -8.8318e-07 20.0562L-5.25946e-07
                                11.9438C-2.35474e-07 5.3474 5.34741 -1.24324e-06 11.9438 -9.57019e-07Z"
                                fill="#4CB5C4"
                            />
                            <ellipse
                                cx="15.8667"
                                cy="16"
                                rx="6.75"
                                ry="6.8"
                                transform="rotate(90 15.8667 16)"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playground;
