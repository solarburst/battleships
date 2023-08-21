import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { ShipEntity } from './entities/ship.entity';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';
import { Stage } from '../games/entities/game.entity';
import { GameMiddlewareCreator } from '../games/game.middleware';

@Module({
    imports: [
        TypeOrmModule.forFeature([ShipEntity]),
        forwardRef(() => GamesModule),
        UsersModule,
    ],
    providers: [ShipsService],
    controllers: [ShipsController],
    exports: [ShipsService],
})
export class ShipsModule {}
