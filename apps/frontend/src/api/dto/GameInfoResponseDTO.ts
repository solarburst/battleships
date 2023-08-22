import { Stage } from 'utils/interfaces';
import { ShipResponseDTO } from './ShipResponseDTO';
import { ShotResponseDTO } from './ShotResponseDTO';

export interface GameInfoResponseDTO {
    gameId: number;
    firstUserId: number;
    secondUserId: number;
    stage: Stage;
    isFirstUserTurn: boolean;
    ships: ShipResponseDTO[];
    shots: ShotResponseDTO[];
}
