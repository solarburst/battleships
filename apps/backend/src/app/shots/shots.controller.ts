import { Controller, Post, Body } from '@nestjs/common';
import { ShotsService } from './shots.service';
import { ShotDto } from './dto/shot.dto';

@Controller('shots')
export class ShotsController {
    constructor(
        private readonly shotsService: ShotsService
    ) {}

    @Post()
    async createShot(@Body() shot: ShotDto) {
        return this.shotsService.createShot(shot);
    }
}
