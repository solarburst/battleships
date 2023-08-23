import { RequestCreator } from '../../api/request-creator';
import { Instance, types } from 'mobx-state-tree';

export interface IShotField {
    // status: ShotResult;
    userId: number;
    // gameId: number;
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
        // gameId: types.number,
        // status: types.optional(
        //     types.enumeration<ShotResult>('ShotResult', Object.values(ShotResult)),
        //     ShotResult.MISS,
        // ),
    });

export interface IShot extends Instance<typeof ShotModel>, IShotField { }
