import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShotsService } from './shots.service';
import { ShotsController } from './shots.controller';
import { ShotEntity } from './entities/shot.entity';
import { GamesModule } from '../games/games.module';
import { ShipsModule } from '../ships/ships.module';
import { UsersModule } from '../users/users.module';

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
export class ShotsModule {}
