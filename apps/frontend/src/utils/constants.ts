import { INotLocatedShipField } from 'mobx/not-located-ships/not-located-ships-model';
import { Orientation } from './interfaces';

export const FIELD_SIZE = 9;
export const CELL_SIZE = 36;
export const BASE_URL = 'http://localhost:4200/';
export const MAX_HITS = 20;

export const initialShips: INotLocatedShipField[] = [
    {
        id: '1',
        length: 4,
        orientation: Orientation.Horizontal,
        isPlaced: false,
    },
    {
        id: '2',
        length: 3,
        orientation: Orientation.Horizontal,
        isPlaced: false,
    },
    {
        id: '3',
        length: 3,
        orientation: Orientation.Horizontal,
        isPlaced: false,
    },
    {
        id: '4',
        length: 2,
        orientation: Orientation.Horizontal,
        isPlaced: false,
    },
    {
        id: '5',
        length: 2,
        orientation: Orientation.Horizontal,
        isPlaced: false,
    },
    {
        id: '6',
        length: 2,
        orientation: Orientation.Horizontal,
        isPlaced: false,
    },
    {
        id: '7',
        length: 1,
        orientation: Orientation.Horizontal,
        isPlaced: false,
    },
    {
        id: '8',
        length: 1,
        orientation: Orientation.Horizontal,
        isPlaced: false,
    },
    {
        id: '9',
        length: 1,
        orientation: Orientation.Horizontal,
        isPlaced: false,
    },
    {
        id: '10',
        length: 1,
        orientation: Orientation.Horizontal,
        isPlaced: false,
    },
];
