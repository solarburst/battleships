import { HttpException, HttpStatus, Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipEntity } from './entities/ship.entity';
import { ShipDto } from './dto/ship.dto';
import { GamesService } from '../games/games.service';
import { UsersService } from '../users/users.service';
import { ShotsService } from '../shots/shots.service';

@Injectable()
export class ShipsService {
    constructor(
        @InjectRepository(ShipEntity)
        private shipsRepository: Repository<ShipEntity>,
        @Inject(forwardRef(() => GamesService))
        private gamesService: GamesService,
        private usersService: UsersService,
        @Inject(forwardRef(() => ShotsService))
        private shotsService: ShotsService,
    ) {}

    async createShip(gameId: number, userId: number, ships: ShipDto[]) {
        const gameInfo = await this.gamesService.getGameUserInfo(gameId, userId);

        const shipsInGame: ShipDto[] = gameInfo.ships;
        const shipsCheck = shipsInGame.concat(ships);

        const user = await this.usersService.getUserById(userId);

        user.positionChecker.putShipsIntoField(shipsCheck);

        const newShips: ShipEntity[] = [];

        for (const ship of ships) {
            const newShip = this.shipsRepository.create({
                ...ship,
                userId,
                gameId,
            });

            await this.shipsRepository.save(newShip);

            newShips.push(newShip);
        }

        return newShips;
    }

    async moveShip(gameId: number, userId: number, shipId: number, shipInfo: ShipDto) {
        const gameInfo = await this.gamesService.getGameUserInfo(gameId, userId);

        if (!gameInfo.ships.find(item => item.id === shipId)) {
            throw new HttpException('Корабль не найден', HttpStatus.NOT_FOUND);
        }
        const foundedShip = await this.shipsRepository.findOne({ where: { id: shipId } });
        const updatedShip = {
            ...foundedShip,
            ...shipInfo,
        };

        const newShips = gameInfo.ships.filter(item => item.id !== foundedShip.id);

        newShips.push(updatedShip);
        const user = await this.usersService.getUserById(userId);

        user.positionChecker.putShipsIntoField(newShips);
        this.shipsRepository.update(shipId, shipInfo);

        return updatedShip;
    }

    async getShipsByGame(gameId: number) {
        const gameShips = await this.shipsRepository.find({ where: { gameId }});

        return gameShips;
    }

    async getShipsByUserAndGame(userId: number, gameId: number) {
        const foundedShips = await this.shipsRepository.find({ where: { userId, gameId } });

        return foundedShips;
    }

    async getDestroyedShips(userId: number, gameId: number) {
        const game = await this.gamesService.getGameById(gameId);

        const enemyId = game.firstUserId === userId ? game.secondUserId : game.firstUserId;

        const enemyShips = await this.getShipsByUserAndGame(enemyId, gameId);

        const enemy = await this.usersService.getUserById(enemyId);

        enemy.positionChecker.putShipsIntoField(enemyShips);

        const allShots = await this.shotsService.getShotsByUserAndGame(userId, gameId);

        allShots.forEach(shotFromAllShots => {
            enemy.positionChecker.putShotIntoField(shotFromAllShots);
        });

        const destroyedShips = enemy.positionChecker.destroyedShips;

        return destroyedShips;
    }

    async deleteShips(gameId: number, userId: number) {
        await this.shipsRepository.delete({ userId, gameId });
    }

    async deleteShip(gameId: number, userId: number, shipId: number) {
        await this.shipsRepository.delete(shipId);
    }
}
