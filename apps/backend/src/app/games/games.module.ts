import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GameEntity } from './entities/game.entity';
import { UsersModule } from '../users/users.module';
import { ShipsModule } from '../ships/ships.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([GameEntity]),
        UsersModule,
        forwardRef(() => ShipsModule),
    ],
    providers: [GamesService],
    controllers: [GamesController],
    exports: [GamesService],
})
export class GamesModule {}
