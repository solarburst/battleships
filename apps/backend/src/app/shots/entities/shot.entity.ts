import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { GameEntity } from '../../games/entities/game.entity';

@Entity('shots')
export class ShotEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => GameEntity)
    @JoinColumn()
    game: GameEntity;

    @Column()
    x: number;

    @Column()
    y: number;
}