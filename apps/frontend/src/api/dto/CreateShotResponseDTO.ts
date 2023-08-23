import { GameInfoResponseDTO } from './GameInfoResponseDTO';
import { ShipResponseDTO } from './ShipResponseDTO';

export enum ShotResult {
    KILL = 'kill',
    HIT = 'hit',
    MISS = 'miss',
}

export interface CreateShotResponseDTO extends GameInfoResponseDTO {
    destroyedShips: ShipResponseDTO[];
}
