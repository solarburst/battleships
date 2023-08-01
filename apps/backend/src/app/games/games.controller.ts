import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { GamesService } from './games.service';;
import { GameDto } from './dto/game.dto';

@Controller('games')
export class GamesController {
    constructor(
        private readonly gamesService: GamesService
    ) {}

    // @Post()
    // async createGame(@Body() game: GameDto) {
    //     return this.gamesService.createGame(game);
    // }

    @Post()
    async createGame() {
        return this.gamesService.createGame();
    }
}
