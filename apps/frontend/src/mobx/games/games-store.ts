import { Instance, flow, getSnapshot, types } from 'mobx-state-tree';
import { RequestCreator } from '../../api/request-creator';
import { IGame, GameModel } from './games-model';
import { useStore } from '../../mobx/store';
import { initialShips } from '../../utils/constants';

const requestCreator = RequestCreator.getInstance();

export const GamesStore = types
    .model({
        currentGame: types.maybeNull(GameModel),
        currentUserId: types.maybe(types.string),
    })
    .views(self => ({
        getUserInfo(id: number) {
            return self.currentGame?.firstUserId === id
                ? {
                    id: self.currentGame?.firstUserId,
                    ready: self.currentGame?.firstUserReady,
                }
                : {
                    id: self.currentGame?.secondUserId,
                    ready: self.currentGame?.secondUserReady,
                };
        },
    }))
    .actions(self => ({
        createGame: flow(function *() {
            const rootStore = useStore();

            const data = yield requestCreator.createGame();

            rootStore.gamesStore.loadGame(String(requestCreator.gameId), String(requestCreator.userId));

            return data;
        }),
        loadGame: flow(function *(gameId: string, userId: string) {
            const rootStore = useStore();

            requestCreator.gameId = Number(gameId);
            requestCreator.userId = Number(userId);

            const gameInfo = yield requestCreator.getGameById();

            self.currentGame = {
                ...gameInfo,
                id: gameInfo.id.toString(),
                inviteLink: `${gameInfo.id}/${gameInfo.firstUserId === Number(userId) ? gameInfo.secondUserId : gameInfo.firstUserId}`,
            };

            self.currentUserId = userId;

            console.log(getSnapshot(rootStore));

            rootStore.notLocatedShipsStore.setShips(initialShips);
            rootStore.locatedShipsStore.fetchShips();
        }),
        setReady: flow(function *(id: number) {
            const rootStore = useStore();

            const updatedGame = yield requestCreator.setUserReady();

            rootStore.gamesStore.currentGame = {
                ...updatedGame,
                id: updatedGame.id.toString(),
                inviteLink: updatedGame.firstUserId === id ? `${updatedGame.id}/${updatedGame.secondUserId}` : `${updatedGame.id}/${updatedGame.firstUserId}`,
            };

            console.log(getSnapshot(rootStore));
        }),
        getGameInfo: flow(function *() {
            const rootStore = useStore();

            const game = yield requestCreator.getGameById();

            rootStore.gamesStore.currentGame = {
                ...game,
                id: game.id.toString(),
                inviteLink: `${game.id}/${game.firstUserId === Number(self.currentUserId) ? game.secondUserId : game.firstUserId}`,
            };
        }),
    }));

export interface IGamesStore extends Instance<typeof GamesStore>, IGame { }
