import { Stage } from 'utils/interfaces';

export interface UpdateGameDTO {
    isFirstUserTurn: boolean;
    stage: Stage;
    firstUserReady: boolean,
    secondUserReady: boolean,
}
