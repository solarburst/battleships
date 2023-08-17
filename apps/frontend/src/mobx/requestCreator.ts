import { getShipsByUserAndGame } from '../api/ships';

export class RequestCreator {
    private static instance: RequestCreator | null = null;
    public gameId: number;
    public userId: number;

    private constructor(gameId: number, userId: number) {
        this.gameId = gameId;
        this.userId = userId;
    }

    public static getInstance(gameId: number, userId: number) {
        if (!RequestCreator.instance) {
            RequestCreator.instance = new RequestCreator(gameId, userId);
        }

        return RequestCreator.instance;
    }

    public getShipsByUserAndGame(gameId: number, userId: number) {
        const data = getShipsByUserAndGame(gameId, userId);

        return data;
    }
}

export const useRequestCreator = (gameId: number, userId: number) => {
    return RequestCreator.getInstance(gameId, userId);
};
