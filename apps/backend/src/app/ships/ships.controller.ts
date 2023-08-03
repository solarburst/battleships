import {
    Body,
    Controller,
    Get,
    Patch,
    Delete,
    Post,
    Param,
    ClassSerializerInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipDto } from './dto/ship.dto';

@Controller('ships')
@UseInterceptors(ClassSerializerInterceptor)
export class ShipsController {
    constructor(
        private readonly shipsService: ShipsService,
    ) {}

    @Post('/:gameId/:userId')
    async createShip(@Param('gameId') gameId: string, @Param('userId') userId: string, @Body() ships: ShipDto[]) {
        return this.shipsService.createShip(Number(gameId), Number(userId), ships);
    }

    @Get('/:gameId/:userId')
    async getShipsByUserAndGame(@Param('userId') userId: string, @Param('gameId') gameId: string) {
        return this.shipsService.getShipsByUserAndGame(Number(userId), Number(gameId));
    }

    @Patch('/:gameId/:userId/:shipId')
    async moveShip(
        @Param('gameId') gameId: string,
        @Param('userId') userId: string,
        @Param('shipId') shipId: string,
        @Body() shipInfo: ShipDto,
    ) {
        return this.shipsService.moveShip(Number(gameId), Number(userId), Number(shipId), shipInfo);
    }

    @Delete('/:gameId/:userId')
    async deleteShips(@Param('gameId') gameId: string, @Param('userId') userId: string) {
        return this.shipsService.deleteShips(Number(gameId), Number(userId));
    }
}
