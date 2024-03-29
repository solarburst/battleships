import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

export enum Stage {
    SETUP = 'setup',
    GAME = 'game',
    OVER = 'over'
}

@Entity('games')
export class GameEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @ManyToOne(() => UserEntity, firstUser => firstUser.id)
    @JoinColumn({ name: 'firstUserId' })
    @Exclude()
        firstUser: UserEntity;

    @ManyToOne(() => UserEntity, secondUser => secondUser.id)
    @JoinColumn({ name: 'secondUserId' })
    @Exclude()
        secondUser: UserEntity;

    @Column({
        type: 'enum',
        'enum': Stage,
        'default': Stage.SETUP,
    })
        stage: Stage;

    @Column()
        isFirstUserTurn: boolean;

    @Column()
    @Exclude()
        firstUserId: number;

    @Column()
    @Exclude()
        secondUserId: number;

    @Column()
        firstUserReady: boolean;

    @Column()
        secondUserReady: boolean;
}
