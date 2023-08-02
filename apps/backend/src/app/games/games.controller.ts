import { Body, Controller, Get, Param, Patch, Post, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { GamesService } from './games.service';;
import { GameDto } from './dto/game.dto';

@Controller('games')
@UseInterceptors(ClassSerializerInterceptor)
export class GamesController {
    constructor(
        private readonly gamesService: GamesService
    ) {}

    @Get()
    async createGame() {
        return this.gamesService.createGame();
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() gameDto: GameDto) {
        return this.gamesService.updateGame(Number(id), gameDto);
    }

    @Get('/all')
    async getAllGames() {
        return this.gamesService.getAllGames();
    }

    @Get(':id')
    async getGameById(@Param('id') id: string) {
        return this.gamesService.getGameById(Number(id));
    }

    @Get('/:gameId/:userId')
    async getGameUserInfo(@Param('gameId') gameId: string, @Param('userId') userId: string) {
        return this.gamesService.getGameUserInfo(Number(gameId), Number(userId));
    }
}
