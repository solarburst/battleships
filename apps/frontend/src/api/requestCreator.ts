import axios, { AxiosInstance } from 'axios';
import { CreateGameResponseDTO } from './dto/CreateGameResponseDTO';
import { ShipPlacementDTO } from './dto/ShipPlacementDTO';
import { ShipResponseDTO } from './dto/ShipResponseDTO';

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
            RequestCreator.instance = new RequestCreator(axios.create({
                withCredentials: true,
                baseURL: 'http://localhost:4200/api',
            }));
        }

        return RequestCreator.instance;
    }

    public async createGame(): Promise<CreateGameResponseDTO> {
        const res = await this.api.get('/games');

        this.setGameId(res.data.id);
        this.setUserId(res.data.firstUser);

        return res.data;
    }

    public async getShipsByUserAndGame() {
        const res = await this.api.get(`/ships/${this.gameId}/${this.userId}`);

        return res.data;
    }

    public async placeNotLocatedShip(values: ShipPlacementDTO[]): Promise<ShipResponseDTO[]> {
        const res = await this.api.post(`/ships/${this.gameId}/${this.userId}`, values);

        return res.data;
    }

    public async placeLocatedShip(shipId: number, values: ShipPlacementDTO): Promise<ShipResponseDTO> {
        const res = await this.api.patch(`/ships/${this.gameId}/${this.userId}/${shipId}`, values);

        return res.data;
    }
}

