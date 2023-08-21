import { Instance, types } from 'mobx-state-tree';
import { Stage } from '../../utils/interfaces';

export interface IGame {
    id: string;
    stage: Stage;
    isFirstUserTurn: boolean;
    firstUserId: number;
    secondUserId: number;
}

export const GameModel = types
    .model({
        id: types.identifier,
        stage: types.optional(types.enumeration<Stage>('Stage', Object.values(Stage)), Stage.SETUP),
        isFirstUserTurn: types.boolean,
        firstUserId: types.number,
        secondUserId: types.number,
        firstUserReady: types.optional(types.boolean, false),
        secondUserReady: types.optional(types.boolean, false),
        inviteLink: types.string,
    })
    .actions(self => ({
        // поменять ход
        // поменять стадию
    }));

export interface IGameModel extends Instance<typeof GameModel> { }
