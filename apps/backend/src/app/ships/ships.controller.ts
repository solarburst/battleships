import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipDto } from './dto/ship.dto';

@Controller('ships')
export class ShipsController {
    constructor(
        private readonly shipsService: ShipsService
    ) {}

    @Post()
    async createShip(@Body() ship: ShipDto) {
        return this.shipsService.createShip(ship);
    }
}
