import { IsNotEmpty } from 'class-validator';
import { Stage } from '../entities/game.entity';

export class GameDto {
  @IsNotEmpty()
  stage: Stage;

  @IsNotEmpty()
  firstUserId: number;

  @IsNotEmpty()
  secondUserId: number;
}