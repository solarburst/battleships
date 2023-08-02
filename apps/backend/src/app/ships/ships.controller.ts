import { Body, Controller, Get, Patch, Post, Param, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipDto } from './dto/ship.dto';

@Controller('ships')
@UseInterceptors(ClassSerializerInterceptor)
export class ShipsController {
    constructor(
        private readonly shipsService: ShipsService
    ) {}

    @Post()
    async createShip(@Body() ship: ShipDto) {
        return this.shipsService.createShip(ship);
    }

    @Get(':id')
    async getShipsByGame(@Param('id') id: string) {
        return this.shipsService.getShipsByGame(+id);
    }

    @Get(':gameId/:userId')
    async getShipsByUserAndGame(@Param('userId') userId: string, @Param('gameId') gameId: string) {
        return this.shipsService.getShipsByUserAndGame(+userId, +gameId);
    }
}
