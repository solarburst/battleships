import { Controller, Post, Get, Body, Param, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ShotsService } from './shots.service';
import { ShotDto } from './dto/shot.dto';

@Controller('shots')
@UseInterceptors(ClassSerializerInterceptor)
export class ShotsController {
    constructor(
        private readonly shotsService: ShotsService,
    ) {}

    @Post('/:gameId/:userId')
    async createShot(@Param('gameId') gameId: string, @Param('userId') userId: string, @Body() shot: ShotDto) {
        return this.shotsService.createShot(Number(gameId), Number(userId), shot);
    }

    @Get('/:gameId/:userId')
    async getShotsByUserAndGame(@Param('gameId') gameId: string, @Param('userId') userId: string) {
        return this.shotsService.getShotsByUserAndGame(Number(userId), Number(gameId));
    }
}
