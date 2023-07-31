import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { GameEntity } from '../../games/entities/game.entity';

@Entity('shots')
export class ShotEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, {nullable: false})
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => GameEntity, (game) => game.id)
    @JoinColumn()
    game: GameEntity;

    @Column()
    x: number;

    @Column()
    y: number;
}