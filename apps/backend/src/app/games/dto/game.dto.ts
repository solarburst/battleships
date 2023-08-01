import { IsNotEmpty } from 'class-validator';
import { Stage } from '../entities/game.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class GameDto {
  @IsNotEmpty()
  stage: Stage;

  // @IsNotEmpty()
  // firstUser: number;

  // @IsNotEmpty()
  // secondUser: number;
}