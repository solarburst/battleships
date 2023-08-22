export enum ShotResult {
    KILL = 'kill',
    HIT = 'hit',
    MISS = 'miss',
}

export interface CreateShotResponseDTO {
    status: ShotResult;
    userId: number;
    gameId: number;
    x: number;
    y: number;
    id: number;
}
