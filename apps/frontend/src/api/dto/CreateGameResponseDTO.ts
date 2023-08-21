import { Stage } from 'utils/interfaces';

export interface CreateGameResponseDTO {
    id: number;
    isFirstUserTurn: boolean;
    stage: Stage;
    firstUserId: number;
    secondUserId: number;
}
