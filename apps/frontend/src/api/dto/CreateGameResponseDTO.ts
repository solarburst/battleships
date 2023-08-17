import { Stage } from 'utils/interfaces';

export interface CreateGameResponseDTO {
    id: number;
    isFirstUserTurn: boolean;
    stage: Stage;
    firstUser: number;
    secondUser: number;
}
