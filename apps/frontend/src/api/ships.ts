import { api } from './axios';
import { ShipResponseDTO } from './dto/ShipResponseDTO';

export const getShipsByUserAndGame = async (gameId: string, userId: string): Promise<ShipResponseDTO[]> => {
    const res = await api.get(`/ships/${gameId}/${userId}`);

    return res.data;
};
