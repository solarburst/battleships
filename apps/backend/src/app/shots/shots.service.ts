import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShotEntity } from './entities/shot.entity';
import { ShotDto } from './dto/shot.dto';

@Injectable()
export class ShotsService {
    constructor(
        @InjectRepository(ShotEntity)
        private shotsRepository: Repository<ShotEntity>,
    ) {}

    async createShot(shot: ShotDto) {
        const newShot = await this.shotsRepository.create(shot);

        await this.shotsRepository.save(newShot);

        return newShot;
    }

    async getShotsByGame(gameId: number) {
        const gameShots = await this.shotsRepository.find({ where: { gameId }});

        return gameShots;
    }

    async getShotsByUserAndGame(userId: number, gameId: number) {
        const foundedShots = await this.shotsRepository.find({ where: { userId, gameId } });

        return foundedShots;
    }
}
