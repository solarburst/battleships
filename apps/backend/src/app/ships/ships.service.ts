import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipEntity } from './entities/ship.entity';
import { ShipDto } from './dto/ship.dto';

@Injectable()
export class ShipsService {
    constructor(
        @InjectRepository(ShipEntity)
        private shipRepository: Repository<ShipEntity>,
    ) {}

    async createShip(ship: ShipDto) {
        const newShip = await this.shipRepository.create(ship);
        await this.shipRepository.save(newShip);
        return newShip;
    }
}
