import { Instance, flow, getSnapshot, types } from 'mobx-state-tree';
import { RequestCreator } from '../../api/request-creator';
import { IGame, GameModel } from './games-model';
import { useStore } from '../../mobx/store';
import { initialShips } from '../../utils/constants';
import { Stage } from '../../utils/interfaces';

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
        setGame: flow(function *(gameId: string, userId: string) {
            const rootStore = useStore();

            requestCreator.gameId = Number(gameId);
            requestCreator.userId = Number(userId);

            const gameInfo = yield requestCreator.getGameById();

            if (gameInfo) {
                self.store = {
                    ...gameInfo,
                    id: gameInfo.id.toString(),
                    inviteLink: gameInfo.firstUserId === Number(userId) ? `${gameInfo.id}/${gameInfo.secondUserId}` : `${gameInfo.id}/${gameInfo.firstUserId}`,
                };
            }

            console.log(getSnapshot(rootStore));

            rootStore.notLocatedShipsStore.setShips(initialShips);
            rootStore.locatedShipsStore.fetchShips();
        }),
        setReady: flow(function *(id: number) {
            const rootStore = useStore();

            let data = self.store?.firstUserId === id
                ? {
                    firstUserReady: !self.store?.firstUserReady,
                }
                : {
                    secondUserReady: !self.store?.secondUserReady,
                };

            if (self.store?.firstUserReady && self.store?.secondUserReady) {
                data = {
                    ...data,
                    stage: Stage.GAME,
                };
            }

            const updatedGame = yield requestCreator.updateGame(data);

            rootStore.gamesStore.store = {
                ...updatedGame,
                id: updatedGame.id.toString(),
                inviteLink: updatedGame.firstUserId === id ? `${updatedGame.id}/${updatedGame.secondUserId}` : `${updatedGame.id}/${updatedGame.firstUserId}`,
            };

            console.log(getSnapshot(rootStore));
        }),
    }));

export interface IGamesStore extends Instance<typeof GamesStore>, IGame { }
