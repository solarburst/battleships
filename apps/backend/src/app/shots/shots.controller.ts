import { Controller, Post, Get, Body, Param, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ShotsService } from './shots.service';
import { ShotDto } from './dto/shot.dto';

@Controller('shots')
@UseInterceptors(ClassSerializerInterceptor)
export class ShotsController {
    constructor(
        private readonly shotsService: ShotsService
    ) {}

    @Post()
    async createShot(@Body() shot: ShotDto) {
        return this.shotsService.createShot(shot);
    }

    @Get(':id')
    async getShotsByGame(@Param('id') id: string) {
        return this.shotsService.getShotsByGame(Number(id));
    }

    @Get(':gameId/:userId')
    async getShotsByUserAndGame(@Param('userId') userId: string, @Param('gameId') gameId: string) {
        return this.shotsService.getShotsByUserAndGame(Number(userId), Number(gameId));
    }
}
