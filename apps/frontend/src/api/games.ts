import { api } from './axios';
import { CreateGameResponseDTO } from './dto/CreateGameResponseDTO';

export const createGame = async (): Promise<CreateGameResponseDTO> => {
    const res = await api.get('/games');

    return res.data;
};
