import { HttpException, HttpStatus, Injectable, NestMiddleware, Type, mixin } from '@nestjs/common';
import { GamesService } from './games.service';
import { Request, Response, NextFunction } from 'express';
import { Stage } from './entities/game.entity';

export function GameMiddlewareCreator(options: Stage): Type<NestMiddleware> {
    @Injectable()
    class GameMiddleware implements NestMiddleware {
        constructor(private readonly gamesService: GamesService) {
        }

        async use(req: Request, res: Response, next: NextFunction) {
            const stage = options;

            const bodyGameId = (req.path).match(/(\d+)/)[0];

            const game = await this.gamesService.getGameById(Number(bodyGameId));

            if (game.stage !== stage) {
                throw new HttpException('Другая стадия игры', HttpStatus.BAD_REQUEST);
            }

            next();
        }
    }

    return mixin(GameMiddleware);
}

