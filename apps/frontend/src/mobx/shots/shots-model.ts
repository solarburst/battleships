import { ShotResult } from '../../api/dto/CreateShotResponseDTO';
import { RequestCreator } from '../../api/request-creator';
import { Instance, flow, types } from 'mobx-state-tree';
import { useStore } from '../store';

export interface IShotField {
    // status: ShotResult;
    // userId: number;
    // gameId: number;
    x: number;
    y: number;
    id: string;
}

const requestCreator = RequestCreator.getInstance();

export const ShotModel = types
    .model({
        id: types.identifier,
        x: types.number,
        y: types.number,
        // userId: types.number,
        // gameId: types.number,
        // status: types.optional(
        //     types.enumeration<ShotResult>('ShotResult', Object.values(ShotResult)),
        //     ShotResult.MISS,
        // ),
    });

export interface IShot extends Instance<typeof ShotModel>, IShotField { }