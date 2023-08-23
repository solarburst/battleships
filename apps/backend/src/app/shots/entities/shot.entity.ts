import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { GameEntity } from '../../games/entities/game.entity';
import { Exclude } from 'class-transformer';
import { ShotResult } from '../../utils/positionChecker';

@Entity('shots')
export class ShotEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'userId' })
        user: UserEntity;

    @ManyToOne(() => GameEntity, game => game.id)
    @JoinColumn({ name: 'gameId' })
        game: GameEntity;

    @Column()
        x: number;

    @Column()
        y: number;

    @Column()
        userId: number;

    @Column()
    @Exclude()
        gameId: number;

    @Column()
        status: string;
}
