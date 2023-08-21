import { Instance, flow, getSnapshot, types } from 'mobx-state-tree';
import { RequestCreator } from '../../api/request-creator';
import { IGame, IGameModel, GameModel } from './games-model';
import { createBaseStore } from '../base-store';

const requestCreator = RequestCreator.getInstance();

export const GamesStore = types
    .model({
        store: types.maybeNull(GameModel),
    })
    .views(self => ({
        getGame() {
            return self.store;
        },
        getUserInfo(id: number) {
            return self.store?.firstUserId === id
                ? {
                    id: self.store?.firstUserId,
                    ready: self.store?.firstUserReady,
                }
                : {
                    id: self.store?.secondUserId,
                    ready: self.store?.secondUserReady,
                };
        },
    }))
    .actions(self => ({
        setGame: flow(function *() {
            const gameInfo = yield requestCreator.getGameById();

            const userId = requestCreator.userId;

            if (gameInfo) {
                self.store = {
                    ...gameInfo,
                    id: gameInfo.id.toString(),
                    firstUserReady: false,
                    secondUserReady: false,
                    inviteLink: gameInfo.firstUserId === userId ? `${gameInfo.id}/${gameInfo.secondUserId}` : `${gameInfo.id}/${gameInfo.firstUserId}`,
                };
            }

            console.log(getSnapshot(self));
        }),
        setReady(id: number) {
            self.store?.firstUserId === id ? (self.store.firstUserReady = !self.store.firstUserReady) : (self.store.secondUserReady = !self.store.secondUserReady);
        },
    }));

export interface IGamesStore extends Instance<typeof GamesStore>, IGame { }
