import { api } from './axios';
import { ShipPlacementDTO } from './dto/ShipPlacementDTO';
import { ShipResponseDTO } from './dto/ShipResponseDTO';

export const getShipsByUserAndGame = async (gameId: number, userId: number): Promise<ShipResponseDTO[]> => {
    const res = await api.get(`/ships/${gameId}/${userId}`);

    return res.data;
};

export const placeNotLocatedShip = async (
    gameId: number,
    userId: number,
    values: ShipPlacementDTO[],
): Promise<ShipResponseDTO[]> => {
    const res = await api.post(`/ships/${gameId}/${userId}`, values);

    return res.data;
};

export const placeLocatedShip = async (
    gameId: number,
    userId: number,
    shipId: number,
    values: ShipPlacementDTO,
): Promise<ShipResponseDTO> => {
    const res = await api.patch(`/ships/${gameId}/${userId}/${shipId}`, values);

    return res.data;
};
