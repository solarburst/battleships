import { Instance, types } from 'mobx-state-tree';

export interface IShotField {
    userId: number;
    x: number;
    y: number;
    id: string;
    status: string;
}

export const ShotModel = types
    .model({
        id: types.identifier,
        x: types.number,
        y: types.number,
        status: types.string,
        userId: types.number,
    });

export interface IShot extends Instance<typeof ShotModel>, IShotField { }
