import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

export enum Stage {
    SETUP = "setup",
    GAME = "game",
    OVER = "over"
}

@Entity('games')
export class GameEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (firstUser) => firstUser.id)
    @JoinColumn({ name: 'firstUserId' })
    firstUser: UserEntity;

    @ManyToOne(() => UserEntity, (secondUser) => secondUser.id)
    @JoinColumn({ name: 'secondUserId' })
    secondUser: UserEntity;

    @Column({
        type: "enum",
        enum: Stage,
        default: Stage.SETUP
    })
    stage: Stage;
}