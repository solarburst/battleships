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
        get inviteLink() {
            if (self.currentGame) {
                return `${self.currentGame.id}/${self.currentGame.firstUserId === Number(self.currentUserId) ? self.currentGame.secondUserId : self.currentGame.firstUserId}`;
            }

            return null;
        },
        get isMyTurn() {
            const isMyTurn = Number(self.currentUserId) === self.currentGame?.firstUserId
                ? (self.currentGame?.isFirstUserTurn)
                : (!self.currentGame?.isFirstUserTurn);

            return isMyTurn;
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

            const gameInfo = yield requestCreator.getGameUserInfo();

            self.currentGame = {
                ...gameInfo,
                id: gameInfo.gameId.toString(),
            };

            self.currentUserId = userId;

            rootStore.notLocatedShipsStore.setShips(initialShips);

            gameInfo.ships.forEach(ship => {
                rootStore.locatedShipsStore.createModel({
                    ...ship,
                    id: ship.id.toString(),
                });
            });

            gameInfo.shots.forEach(shot => {
                rootStore.shotsStore.createModel({
                    ...shot,
                    id: shot.id.toString(),
                });
            });

            console.log(getSnapshot(rootStore));
        }),
        setReady: flow(function *(id: number) {
            const rootStore = useStore();

            const updatedGame = yield requestCreator.setUserReady();

            rootStore.gamesStore.currentGame = {
                ...updatedGame,
                id: updatedGame.id.toString(),
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
