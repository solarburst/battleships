import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { ShipEntity } from './entities/ship.entity';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';

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
