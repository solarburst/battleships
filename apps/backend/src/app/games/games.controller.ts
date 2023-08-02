import { Body, Controller, Get, Param, Patch, Post, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { GamesService } from './games.service';;
import { GameDto } from './dto/game.dto';

@Controller('games')
@UseInterceptors(ClassSerializerInterceptor)
export class GamesController {
    constructor(
        private readonly gamesService: GamesService
    ) {}

    @Post()
    async createGame() {
        return this.gamesService.createGame();
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() gameDto: GameDto) {
        return this.gamesService.updateGame(+id, gameDto);
    }

    @Get('/all')
    async getAllGames() {
        return this.gamesService.getAllGames();
    }
}
