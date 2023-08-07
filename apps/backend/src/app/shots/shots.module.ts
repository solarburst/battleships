import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShotsService } from './shots.service';
import { ShotsController } from './shots.controller';
import { ShotEntity } from './entities/shot.entity';
import { GamesModule } from '../games/games.module';
import { ShipsModule } from '../ships/ships.module';
import { UsersModule } from '../users/users.module';
import { GameMiddlewareCreator } from '../games/game.middleware';
import { Stage } from '../games/entities/game.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ShotEntity]),
        GamesModule,
        ShipsModule,
        UsersModule,
    ],
    providers: [ShotsService],
    controllers: [ShotsController],
    exports: [ShotsService],
})
export class ShotsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(GameMiddlewareCreator(Stage.GAME))
            .forRoutes('shots');
    }
}
