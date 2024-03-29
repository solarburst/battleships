import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { ShipEntity } from './entities/ship.entity';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';
import { Stage } from '../games/entities/game.entity';
import { GameMiddlewareCreator } from '../games/game.middleware';
import { ShotsModule } from '../shots/shots.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ShipEntity]),
        forwardRef(() => GamesModule),
        UsersModule,
        forwardRef(() => ShotsModule),
    ],
    providers: [ShipsService],
    controllers: [ShipsController],
    exports: [ShipsService],
})
export class ShipsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(GameMiddlewareCreator(Stage.SETUP))
            .forRoutes(
                { path: 'ships/*', method: RequestMethod.POST },
                { path: 'ships/*', method: RequestMethod.PATCH },
            );
    }
}
