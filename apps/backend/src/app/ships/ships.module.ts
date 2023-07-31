import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { ShipEntity } from './entities/ship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShipEntity])],
  providers: [ShipsService],
  controllers: [ShipsController],
  exports: [ShipsService],
})
export class ShipsModule {}
