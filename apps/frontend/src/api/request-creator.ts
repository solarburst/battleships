import axios, { AxiosInstance } from 'axios';
import { CreateGameResponseDTO } from './dto/CreateGameResponseDTO';
import { ShipPlacementDTO } from './dto/ShipPlacementDTO';
import { ShipResponseDTO } from './dto/ShipResponseDTO';
import { CreateShotDTO } from './dto/CreateShotDTO';
import { ShotResponseDTO } from './dto/ShotResponseDTO';
import { GameInfoResponseDTO } from './dto/GameInfoResponseDTO';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4200/api',
});

instance.interceptors.response.use(
    res => res,
    err => {
        const statusCode = err.response.status;

        if (statusCode === 400) {
            Promise.reject(err.response.data.message);
        }

        if (statusCode === 404) {
            Promise.reject('Не найдено');
        }

        if (statusCode === 500) {
            Promise.reject('Внутренняя ошибка сервера');
        }
    },
);

export class RequestCreator {
    private static instance: RequestCreator | null = null;
    public gameId: number;
    public userId: number;
    public api: AxiosInstance;

    private constructor(api: AxiosInstance) {
        this.api = api;
    }

    setGameId(gameId: number) {
        this.gameId = gameId;
    }

    setUserId(userId: number) {
        this.userId = userId;
    }

    public static getInstance() {
        if (!RequestCreator.instance) {
            RequestCreator.instance = new RequestCreator(instance);
        }

        return RequestCreator.instance;
    }

    public async createGame(): Promise<CreateGameResponseDTO> {
        const res = await this.api.get('/games');

        this.setGameId(res.data.id);
        this.setUserId(res.data.firstUser);

        return res?.data;
    }

    public async setUserReady(): Promise<CreateGameResponseDTO> {
        const res = await this.api.get(`/games/${this.gameId}/${this.userId}/ready`);

        return res?.data;
    }

    public async getGameById(): Promise<CreateGameResponseDTO> {
        const res = await this.api.get(`/games/${this.gameId}`);

        return res?.data;
    }

    public async getGameUserInfo(): Promise<GameInfoResponseDTO> {
        const res = await this.api.get(`/games/${this.gameId}/${this.userId}`);

        return res?.data;
    }

    public async getShipsByUserAndGame(): Promise<ShipResponseDTO[]> {
        const res = await this.api.get(`/ships/${this.gameId}/${this.userId}`);

        return res?.data;
    }

    public async getDestroyedShips(): Promise<ShipResponseDTO[]> {
        const res = await this.api.get(`/ships/${this.gameId}/${this.userId}/destroyed`);

        return res?.data;
    }

    public async placeNotLocatedShip(values: ShipPlacementDTO[]): Promise<ShipResponseDTO[]> {
        const res = await this.api.post(`/ships/${this.gameId}/${this.userId}`, values);

        return res?.data;
    }

    public async placeLocatedShip(shipId: number, values: ShipPlacementDTO): Promise<ShipResponseDTO> {
        const res = await this.api.patch(`/ships/${this.gameId}/${this.userId}/${shipId}`, values);

        return res?.data;
    }

    public async deleteShips() {
        const res = await this.api.delete(`/ships/${this.gameId}/${this.userId}`);

        return res?.data;
    }

    public async deleteShip(shipId: number) {
        const res = await this.api.delete(`/ships/${this.gameId}/${this.userId}/${shipId}`);

        return res?.data;
    }

    public async createShot(values: CreateShotDTO): Promise<GameInfoResponseDTO> {
        const res = await this.api.post(`/shots/${this.gameId}/${this.userId}`, values);

        return res?.data;
    }

    public async getShots(): Promise<ShotResponseDTO[]> {
        const res = await this.api.get(`/shots/${this.gameId}/${this.userId}`);

        return res?.data;
    }

    public async getEnemyShots(userId: number): Promise<ShotResponseDTO[]> {
        const res = await this.api.get(`/shots/${this.gameId}/${userId}`);

        return res?.data;
    }
}

