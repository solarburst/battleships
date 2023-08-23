import { Instance, types } from 'mobx-state-tree';

export enum ShotResult {
    KILL = 'kill',
    HIT = 'hit',
    MISS = 'miss'
}

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
        status: types.optional(
            types.enumeration<ShotResult>('ShotResult', Object.values(ShotResult)),
            ShotResult.MISS,
        ),
        userId: types.number,
    });

export interface IShot extends Instance<typeof ShotModel>, IShotField { }
