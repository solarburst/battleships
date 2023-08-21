import { Body, Controller, Get, Param, Patch, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { GamesService } from './games.service';
import { GameDto } from './dto/game.dto';

@Controller('games')
@UseInterceptors(ClassSerializerInterceptor)
export class GamesController {
    constructor(
        private readonly gamesService: GamesService,
    ) {}

    @Get()
    async createGame() {
        return this.gamesService.createGame();
    }

    @Get('/:gameId/:userId')
    async getGameUserInfo(@Param('gameId') gameId: string, @Param('userId') userId: string) {
        return this.gamesService.getGameUserInfo(Number(gameId), Number(userId));
    }

    @Get('/:gameId')
    async getGameInfo(@Param('gameId') gameId: string) {
        return this.gamesService.getGameById(Number(gameId));
    }
}
