import { IsBoolean, IsNotEmpty, ValidateIf } from 'class-validator';
import { Stage } from '../entities/game.entity';

export class GameDto {
  @IsNotEmpty()
  @ValidateIf(o => o.stage)
      stage: Stage;

  @IsNotEmpty()
  @IsBoolean()
      isFirstUserTurn: boolean;
}
