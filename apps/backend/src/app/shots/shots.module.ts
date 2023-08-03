import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShotsService } from './shots.service';
import { ShotsController } from './shots.controller';
import { ShotEntity } from './entities/shot.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ShotEntity])],
    providers: [ShotsService],
    controllers: [ShotsController],
    exports: [ShotsService],
})
export class ShotsModule {}
